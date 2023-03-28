// Адрес страницы, позиция скролла в цифрах
export type ScrollSchema = Record<string, number>;

export interface ScrollRestorationSchema {
  scroll: ScrollSchema;
}
