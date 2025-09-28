# AGENTS.md - Development Guidelines

## Package Manager Rules

### Use pnpm for all package management

This project uses **pnpm** as the package manager. All package management operations must be performed using pnpm commands.

### Required pnpm Commands

#### Installation
```bash
# Install dependencies
pnpm install

# Install a new dependency
pnpm add <package-name>

# Install a development dependency
pnpm add -D <package-name>

# Install a global package
pnpm add -g <package-name>
```

#### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

#### Package Management
```bash
# Update dependencies
pnpm update

# Update a specific package
pnpm update <package-name>

# Remove a package
pnpm remove <package-name>

# List installed packages
pnpm list

# Check for outdated packages
pnpm outdated
```

### Prohibited Commands

❌ **DO NOT USE:**
- `npm install`
- `npm run dev`
- `npm run build`
- `yarn install`
- `yarn dev`
- `yarn build`

### Why pnpm?

1. **Faster installations** - pnpm uses hard links and symlinks for efficient storage
2. **Disk space efficiency** - Shared dependency storage across projects
3. **Strict dependency resolution** - Prevents phantom dependencies
4. **Better monorepo support** - Excellent for workspace management
5. **Security** - Built-in security features and audit capabilities

### Project Structure

```
requiredtechnology-web/
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # Lock file (DO NOT DELETE)
├── pnpm-workspace.yaml   # Workspace configuration (if applicable)
└── node_modules/         # Dependencies (managed by pnpm)
```

### Scripts Available

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack", 
    "start": "next start"
  }
}
```

### Best Practices

1. **Always use pnpm** for package management
2. **Commit pnpm-lock.yaml** to version control
3. **Use exact versions** for critical dependencies
4. **Regular updates** - Run `pnpm update` regularly
5. **Clean installs** - Use `pnpm install --frozen-lockfile` in CI/CD

### Troubleshooting

#### Clear pnpm cache
```bash
pnpm store prune
```

#### Force reinstall
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### Check pnpm version
```bash
pnpm --version
```

### CI/CD Integration

For continuous integration, use:
```bash
pnpm install --frozen-lockfile
pnpm build
```

This ensures reproducible builds by using the exact versions specified in the lock file.

---

**Important:** All team members and automated systems must use pnpm for this project. Using npm or yarn will result in inconsistent dependency resolution and potential build issues.
