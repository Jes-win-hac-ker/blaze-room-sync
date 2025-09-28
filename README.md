# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/16b57b5a-7c36-4880-9862-0b18f33a258b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/16b57b5a-7c36-4880-9862-0b18f33a258b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages. Simply push your changes to the `main` branch and GitHub Actions will automatically build and deploy your app.

1. Make sure GitHub Pages is enabled in your repository settings
2. Set the source to "GitHub Actions"
3. Push your changes to the `main` branch
4. Your app will be available at: `https://jes-win-hac-ker.github.io/blaze-room-sync/`

### Manual Build for GitHub Pages

```sh
# Build for GitHub Pages
npm run build:github

# The built files will be in the 'dist' directory
```

### Lovable Platform

Simply open [Lovable](https://lovable.dev/projects/16b57b5a-7c36-4880-9862-0b18f33a258b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
