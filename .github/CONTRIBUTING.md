# Contributing in @UNOGroup-Practicum

## UNOGroup-Practicum Commit Conventions

Each commit message has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
```

The **scope** is optional.

Examples:

```
docs(readme): update install instructions
```

```
fix: refer to the `entrypoint` instead of the first `module`
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: babel, npm)
- **chore**: Changes that fall outside of build / docs that do not effect source code (example scopes: package, defaults)
- **ci**: Changes to our CI configuration files and scripts (example scopes: circleci, travis)
- **docs**: Documentation only changes (example scopes: readme, changelog)
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Used when reverting a committed change
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons)
- **test**: Addition of or updates to Jest tests

### Scope

The scope is subjective & depends on the `type` see above. A good example would be a change to a particular class / module.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

More about [Commit Conventions](https://www.conventionalcommits.org/ru/v1.0.0/)