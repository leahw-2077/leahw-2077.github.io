import { Fragment, type ReactNode } from "react";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’'“”"?:]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderInline(value: string, keyRoot: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|\n)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    const token = match[0];
    const key = `${keyRoot}-${index++}`;

    if (token === "\n") {
      nodes.push(<br key={key} />);
    } else if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
      if (link) {
        nodes.push(
          <a key={key} href={link[2]} target="_blank" rel="noreferrer">
            {link[1]}
          </a>,
        );
      }
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    cursor = match.index + token.length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function isBlockStart(line: string) {
  return /^(#{1,2} |---$|!\[|\| |- |\d+\. )/.test(line);
}

function paragraphClass(value: string, isFirst: boolean) {
  if (isFirst) return "article-lede";
  if (/^\*\*[^*]+\*\*$/.test(value.trim())) return "article-thesis";
  if (/^(τ|y =|Θ|Learning Velocity|P_domain)/.test(value.trim())) return "article-equation";
  if (/^(The product learning system:|The same user feedback may imply|Conceptual illustration:)/.test(value.trim())) {
    return "article-caption";
  }
  return undefined;
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let key = 0;
  let firstParagraph = true;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,2})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const label = heading[2].trim();
      const id = slugify(label);
      blocks.push(
        level === 1 ? (
          <h2 id={id} key={`block-${key++}`}>{renderInline(label, id)}</h2>
        ) : (
          <h3 id={id} key={`block-${key++}`}>{renderInline(label, id)}</h3>
        ),
      );
      index += 1;
      continue;
    }

    if (line.trim() === "---") {
      blocks.push(<hr key={`block-${key++}`} />);
      index += 1;
      continue;
    }

    const image = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      blocks.push(
        <figure className="article-figure" key={`block-${key++}`}>
          <img src={image[2]} alt={image[1]} loading="lazy" />
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(lines[index].trim().slice(1, -1).split("|").map((cell) => cell.trim()));
        index += 1;
      }
      const body = rows.filter((row) => !row.every((cell) => /^-+$/.test(cell)));
      const [head, ...rest] = body;
      blocks.push(
        <div className="article-table-wrap" key={`block-${key++}`}>
          <table>
            <thead><tr>{head.map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell, `th-${key}-${cellIndex}`)}</th>)}</tr></thead>
            <tbody>{rest.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell, `td-${key}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const items: string[] = [];
      const orderedList = Boolean(ordered);
      const itemPattern = orderedList ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
      while (index < lines.length) {
        const item = lines[index].trim().match(itemPattern);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      const children = items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, `li-${key}-${itemIndex}`)}</li>);
      blocks.push(orderedList ? <ol key={`block-${key++}`}>{children}</ol> : <ul key={`block-${key++}`}>{children}</ul>);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trimEnd().replace(/\s{2}$/, ""));
      index += 1;
    }
    const value = paragraph.join("\n");
    const className = paragraphClass(value, firstParagraph);
    firstParagraph = false;
    blocks.push(
      <p className={className} key={`block-${key++}`}>
        {renderInline(value, `p-${key}`)}
      </p>,
    );
  }

  return <Fragment>{blocks}</Fragment>;
}
