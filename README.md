
  # Personal portfolio

  This is a code bundle for Portfolio Page Design. The original project is available at https://www.figma.com/design/Fh01RzO6UrqXQ7AxwNTXFu/Portfolio-Page-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
    Recommended: open this project in VS Code and use the provided Dev Container (`.devcontainer`) to get a consistent environment with Node and pnpm installed automatically.
  
    - To open in the Dev Container: In VS Code use **Remote-Containers: Open Folder in Container** and select this workspace. The container will run `pnpm install` automatically after it is created.
  
    Local setup (if you prefer to run locally):
  
    - With npm (requires Node.js installed):
  
  ```powershell
  npm install
  npm run dev
  ```
  
    - With pnpm (recommended if you use the repo's pnpm workspace):
  
  ```powershell
  # enable corepack (bundled with newer Node.js) or install pnpm
  corepack enable
  pnpm install
  pnpm run dev
  ```
  
    Troubleshooting:
    - If `npm` or `pnpm` is not found, install Node.js from https://nodejs.org/ (LTS recommended). On Windows you can enable `corepack` to use `pnpm`.
    - Dev Container users do not need to install Node locally — the container image includes Node and will run the post-create install.
  