import { Shush } from "@shushfi/sdk";

export const createShush = (config: { integratorId: string }) => {
  return new Shush(config);
};
