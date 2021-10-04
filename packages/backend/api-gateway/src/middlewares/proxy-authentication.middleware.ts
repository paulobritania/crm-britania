import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientRequest } from 'http';
import * as HttpProxy from 'http-proxy';

@Injectable()
export class ProxyAuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const apiProxy = HttpProxy.createProxyServer();
    const { AUTHENTICATION_SVC_URL, AUTHENTICATION_SVC_PORT } = process.env;

    apiProxy.web(req, res, {
      changeOrigin: true,
      target: `http://${AUTHENTICATION_SVC_URL}:${AUTHENTICATION_SVC_PORT}`,
    });

    apiProxy.on('proxyReq', (proxyReq: ClientRequest, req: Request) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    });
  }
}
