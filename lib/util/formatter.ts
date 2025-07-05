function formatToThousandsWithCommas(value: number): string {
  const inThousands = Math.round(value / 1000); // 单位换成千元并四舍五入
  return new Intl.NumberFormat('en-US').format(inThousands).toLocaleString();
}

export {
    formatToThousandsWithCommas
}