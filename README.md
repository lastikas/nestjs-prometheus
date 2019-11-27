# NestJS Prometheus

![https://github.com/willsoto/nestjs-prometheus/actions?query=workflow%3Atests](https://github.com/willsoto/nestjs-prometheus/workflows/tests/badge.svg)

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Changing the metrics http endpoint](#changing-the-metrics-http-endpoint)
  * [Disabling default metrics collection](#disabling-default-metrics-collection)
  * [Configuring the default metrics](#configuring-the-default-metrics)
- [Injecting individual metrics](#injecting-individual-metrics)
- [Available metrics](#available-metrics)
    + [Counter](#counter)
    + [Gauge](#gauge)
    + [Histogram](#histogram)
    + [Summary](#summary)

<!-- tocstop -->

## Installation

```bash
yarn add @willsoto/nestjs-prometheus prom-client
```

```bash
npm install @willsoto/nestjs-prometheus prom-client
```

## Usage

```typescript
import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [PrometheusModule.register()],
})
export class AppModule {}
```

By default, this will register a `/metrics` endpoint that will return the [default metrics](https://github.com/siimon/prom-client#default-metrics).

### Changing the metrics http endpoint

```typescript
import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule.register({
      path: "/mymetrics",
    }),
  ],
})
export class AppModule {}
```

### Disabling default metrics collection

```typescript
import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
})
export class AppModule {}
```

### Configuring the default metrics

```typescript
import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        // See https://github.com/siimon/prom-client#configuration
        config: {},
      },
    }),
  ],
})
export class AppModule {}
```

## Injecting individual metrics

```typescript
// module.ts
import { Module } from "@nestjs/common";
import {
  PrometheusModule,
  makeCounterProvider,
} from "@willsoto/nestjs-prometheus";
import { Service } from "./service";

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    Service,
    makeCounterProvider({
      name: "metric_name",
      help: "metric_help",
    }),
  ],
})
export class AppModule {}
```

```typescript
// service.ts
import { Injectable } from "@nestjs/common";
import { Counter } from "prom-client";

@Injectable()
export class Service {
  constructor(@InjectMetric("metric_name") public counter: Counter) {}
}
```

## Available metrics

#### [Counter](https://github.com/siimon/prom-client#counter)

```typescript
import { makeCounterProvider } from "@willsoto/nestjs-prometheus";
```

#### [Gauge](https://github.com/siimon/prom-client#gauge)

```typescript
import { makeGaugeProvider } from "@willsoto/nestjs-prometheus";
```

#### [Histogram](https://github.com/siimon/prom-client#histogram)

```typescript
import { makeHistogramProvider } from "@willsoto/nestjs-prometheus";
```

#### [Summary](https://github.com/siimon/prom-client#summary)

```typescript
import { makeSummaryProvider } from "@willsoto/nestjs-prometheus";
```
