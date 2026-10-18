import { fileURLToPath } from "url"
import { dirname } from "path"

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  images: { unoptimized: true },
}

export default nextConfig
