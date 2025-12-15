# Contributing to Fidolity

Thank you for your interest in contributing to Fidolity! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/fidolity/fidolity/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, etc.)

### Suggesting Features

1. Check existing [feature requests](https://github.com/fidolity/fidolity/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with:
   - Clear title and description
   - Use case and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write or update tests if needed
5. Ensure code follows our style guide
6. Commit with clear messages: `git commit -m 'Add some feature'`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Test your changes locally
- Ensure all existing tests pass
- Add new tests for new features
- Test on multiple browsers if UI changes

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add staking rewards calculator`

## Development Setup

1. Clone your fork
2. Install dependencies: `cd frontend && yarn install`
3. Copy `.env.example` to `.env`
4. Run dev server: `yarn dev`

## Questions?

Feel free to ask questions in:
- [GitHub Discussions](https://github.com/fidolity/fidolity/discussions)
- [Discord](https://discord.gg/fidolity)

Thank you for contributing! 🎉
