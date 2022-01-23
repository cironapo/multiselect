# cn-multiselect



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                     | Type                 | Default              |
| ------------------- | -------------------- | ------------------------------- | -------------------- | -------------------- |
| `disabled`          | `disabled`           | (optional) disable multiselect  | `boolean`            | `false`              |
| `multiple`          | `multiple`           | (optional) enable multi values  | `boolean`            | `true`               |
| `options`           | `options`            | (optional) options              | `Option[] \| string` | `undefined`          |
| `placeholder`       | `placeholder`        | (optional) placeholder          | `string`             | `'Select option...'` |
| `placeholderSearch` | `placeholder-search` | (optional) search's placeholder | `string`             | `'Search...'`        |
| `search`            | `search`             | (optional) enable search        | `boolean`            | `false`              |
| `selected`          | `selected`           | (optional) selected values      | `string \| string[]` | `undefined`          |


## Events

| Event          | Description                       | Type                    |
| -------------- | --------------------------------- | ----------------------- |
| `changeValues` | (optional) event on change values | `CustomEvent<string[]>` |


## CSS Custom Properties

| Name                                                  | Description                        |
| ----------------------------------------------------- | ---------------------------------- |
| `--cn-multiselect-background-color-selected-checkbox` | background color selected checkbox |
| `--cn-multiselect-background-color-selected-option`   | background color selected option   |
| `--cn-multiselect-border-color`                       | border color                       |
| `--cn-multiselect-border-color-checkbox`              | border color checkbox              |
| `--cn-multiselect-border-color-selected-checkbox`     | border color selected checkbox     |
| `--cn-multiselect-border-color-selected-option`       | border color selected option       |
| `--cn-multiselect-border-radius`                      | border radius (es. 1px)            |
| `--cn-multiselect-border-size`                        | border size (es. 1px)              |
| `--cn-multiselect-color-option`                       | font color option                  |
| `--cn-multiselect-color-placeholder`                  | font color selected option         |
| `--cn-multiselect-color-search`                       | font color search text             |
| `--cn-multiselect-color-selected-option`              | font color selected option         |
| `--cn-multiselect-font`                               | font family                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
