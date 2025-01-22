type NotNullish = (v: unknown) => v is null;
export const isNullish: NotNullish = (v: unknown): v is null => (v === null || v === undefined);
