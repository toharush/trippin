export class RateLimitError extends Error {
    limit: number;
    remaining: number;
    resetTime: number;
  
    constructor(message: string, limit: number, remaining: number, resetTime: number) {
      super(message);
      this.limit = limit;
      this.remaining = remaining;
      this.resetTime = resetTime;
    }
  }
  