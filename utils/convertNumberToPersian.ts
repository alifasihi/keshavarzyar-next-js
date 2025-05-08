// utils/convertNumberToPersian.ts

/**
 * تبدیل عدد انگلیسی به فارسی با جداسازی سه‌رقمی
 * @param value عدد ورودی (string یا number)
 * @param separator جداکننده سه‌رقمی (پیش‌فرض: ,)
 * @returns عدد تبدیل‌شده به فارسی
 */
export function convertNumberToPersian(
    value: number | string,
    separator: string = ','
  ): string {
    if (value === null || value === undefined) return '';

    // حذف هر چیز غیر عددی به جز نقطه
    const numberStr = value.toString().replace(/[^\d.]/g, '');

    const parts = numberStr.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] ? '.' + parts[1] : '';

    // افزودن جداکننده سه‌رقمی
    const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    // تبدیل به فارسی
    const persianDigits = formatted.replace(/\d/g, (digit) =>
      '۰۱۲۳۴۵۶۷۸۹'[parseInt(digit)]
    );

    return persianDigits + decimalPart;
  }
