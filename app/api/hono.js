// pages/api/hono.js
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
});
