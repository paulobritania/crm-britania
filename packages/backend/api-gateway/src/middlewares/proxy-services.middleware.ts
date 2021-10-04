import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientRequest } from 'http';
import * as HttpProxy from 'http-proxy';

@Injectable()
export class ProxyServicesMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const apiProxy = HttpProxy.createProxyServer();
    const { SERVICES_SVC_URL, SERVICES_SVC_PORT } = process.env;

    apiProxy.web(req, res, {
      changeOrigin: true,
      target: SERVICES_SVC_URL
        ? `http://${SERVICES_SVC_URL}:${SERVICES_SVC_PORT}`
        : 'http://localhost:3017',
    });

    apiProxy.on('proxyReq', (proxyReq: ClientRequest, req: Request) => {
      if (req.body && req.headers['content-type'] === 'application/json') {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

        proxyReq.write(bodyData);
      }
    });
  }
}
