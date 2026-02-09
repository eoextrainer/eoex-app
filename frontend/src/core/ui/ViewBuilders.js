function createPanel(title, subtitle) {
  const panel = document.createElement("section");
  panel.className = "panel";
  if (title) {
    const h2 = document.createElement("h2");
    h2.textContent = title;
    panel.appendChild(h2);
  }
  if (subtitle) {
    const p = document.createElement("p");
    p.className = "panel-subtitle";
    p.textContent = subtitle;
    panel.appendChild(p);
  }
  return panel;
}

export function renderKpiTiles(root, tiles) {
  const grid = document.createElement("div");
  grid.className = "tile-grid";
  tiles.forEach((tile) => {
    const card = document.createElement("div");
    card.className = "tile";
    const label = document.createElement("div");
    label.className = "tile-label";
    label.textContent = tile.label;
    const value = document.createElement("div");
    value.className = "tile-value";
    value.textContent = tile.value;
    const meta = document.createElement("div");
    meta.className = "tile-meta";
    meta.textContent = tile.meta || "";
    card.append(label, value, meta);
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

export function renderGroupedCards(root, groups) {
  const grid = document.createElement("div");
  grid.className = "card-grid";
  groups.forEach((group) => {
    const section = document.createElement("div");
    section.className = "card-group";
    const title = document.createElement("div");
    title.className = "card-group-title";
    title.textContent = group.title;
    section.appendChild(title);

    group.cards.forEach((cardInfo) => {
      const card = document.createElement("div");
      card.className = "card";
      const heading = document.createElement("div");
      heading.className = "card-title";
      heading.textContent = cardInfo.title;
      card.appendChild(heading);

      if (cardInfo.value) {
        const value = document.createElement("div");
        value.className = "card-value";
        value.textContent = cardInfo.value;
        card.appendChild(value);
      }

      if (cardInfo.items?.length) {
        const list = document.createElement("ul");
        list.className = "card-list";
        cardInfo.items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });
        card.appendChild(list);
      }

      if (cardInfo.status) {
        const status = document.createElement("div");
        status.className = "status";
        status.textContent = cardInfo.status;
        card.appendChild(status);
      }

      section.appendChild(card);
    });

    grid.appendChild(section);
  });
  root.appendChild(grid);
}

export function renderListView(root, { title, subtitle, columns, rows }) {
  const panel = createPanel(title, subtitle);
  const table = document.createElement("table");
  table.className = "data-table";

  const headRow = document.createElement("tr");
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col.label;
    headRow.appendChild(th);
  });
  table.appendChild(headRow);

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((col) => {
      const td = document.createElement("td");
      td.textContent = row[col.key] ?? "";
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  panel.appendChild(table);
  root.appendChild(panel);
}

export function renderDetailCard(root, { title, subtitle, fields }) {
  const panel = createPanel(title, subtitle);
  const list = document.createElement("div");
  list.className = "detail-list";
  fields.forEach((field) => {
    const row = document.createElement("div");
    row.className = "detail-row";
    const label = document.createElement("span");
    label.className = "detail-label";
    label.textContent = field.label;
    const value = document.createElement("span");
    value.className = "detail-value";
    value.textContent = field.value;
    row.append(label, value);
    list.appendChild(row);
  });
  panel.appendChild(list);
  root.appendChild(panel);
}

export function renderYearCalendar(root, { title, year, entries }) {
  const panel = createPanel(title, `Planning view for ${year}`);
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  months.forEach((month, index) => {
    const card = document.createElement("div");
    card.className = "calendar-card";
    const heading = document.createElement("div");
    heading.className = "calendar-month";
    heading.textContent = `${month} ${year}`;
    card.appendChild(heading);

    const list = document.createElement("div");
    list.className = "calendar-list";
    entries
      .filter((entry) => entry.month === index + 1)
      .forEach((entry) => {
        const item = document.createElement("div");
        item.className = "calendar-item";
        item.innerHTML = `<span>${entry.day}</span><span>${entry.label}</span>`;
        list.appendChild(item);
      });

    if (!list.childNodes.length) {
      const empty = document.createElement("div");
      empty.className = "status";
      empty.textContent = "No scheduled entries";
      list.appendChild(empty);
    }

    card.appendChild(list);
    grid.appendChild(card);
  });

  panel.appendChild(grid);
  root.appendChild(panel);
}
