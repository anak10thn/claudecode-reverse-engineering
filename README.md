# Juriko Code

A TypeScript-based CLI tool for code assistance using Anthropic's Juriko AI.

## Installation

```bash
npm install
```

## Configuration

The application uses environment variables for configuration. Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `ANTHROPIC_API_URL`: Anthropic API URL (default: https://api.anthropic.com/v1)
- `ANTHROPIC_MODEL`: The Juriko model to use (e.g., claude-2)

Optional environment variables:

- `LOG_LEVEL`: Logging level (debug, info, warn, error)
- `NODE_ENV`: Environment (development, production)

## Building

```bash
npm run build
```

## Usage

After building, you can run the CLI tool:

```bash
npm start
```

## Development

For development, you can use:

```bash
npm run dev
```

This will watch for changes and rebuild automatically.

## License

MIT