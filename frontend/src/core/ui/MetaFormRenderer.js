function buildInput(field, value) {
  if (field.ui_component === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.name = field.code;
    textarea.value = value ?? "";
    return textarea;
  }

  if (field.ui_component === "select") {
    const select = document.createElement("select");
    select.name = field.code;
    const options = field.metadata?.options || [];
    options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
    select.value = value ?? options[0] ?? "";
    return select;
  }

  const input = document.createElement("input");
  input.name = field.code;
  input.type = field.ui_component === "number" ? "number" : "text";
  input.value = value ?? "";
  return input;
}

export function renderForm(root, metaDef, data = {}, onSubmit) {
  const form = document.createElement("form");
  form.className = "form-grid";

  const fields = [...metaDef.fields].sort((a, b) => a.ui_order - b.ui_order);
  fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-field";
    const label = document.createElement("label");
    label.textContent = field.name;
    const value = data[field.code] ?? field.default_value ?? "";
    const input = buildInput(field, value);
    wrapper.append(label, input);
    form.appendChild(wrapper);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "button";
  button.textContent = "Save";
  form.appendChild(button);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = {};
    fields.forEach((field) => {
      payload[field.code] = form.elements[field.code]?.value ?? "";
    });
    onSubmit(payload);
  });

  root.appendChild(form);
}
