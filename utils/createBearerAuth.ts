export function createBearerAuth(token: string): string {
  return `Bearer ${token}`;
}
