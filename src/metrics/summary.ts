import { Provider } from "@nestjs/common";
import client from "prom-client";
import { getOrCreateMetric, getToken } from "./utils";

export function makeSummaryProvider(
  options: client.SummaryConfiguration<string>,
): Provider {
  return {
    provide: getToken(options.name),
    useFactory(): client.Metric<string> {
      return getOrCreateMetric("Summary", options);
    },
  };
}
