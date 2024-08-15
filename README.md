
# Note
This project has not been updated in the last year and does not work with the current version of quivr because of the huge api changes. 

# Quivr - Mobile

The Quivr React Native Client is a mobile application built using React Native that provides users with the ability to upload files and engage in chat conversations using the [Quivr backend API](https://github.com/stangirard/quivr).

https://github.com/iMADi-ARCH/quivr-mobile/assets/61308761/878da303-b056-4c14-a3c4-f29e7e375d45

## Tech used

- React Native (with expo)
- React Native Paper
- React Native Navigation

## Features

- File Upload: Users can easily upload files to the Quivr backend API using the client.
- Chat with your brain: Talk to a language model about your uploaded data

## Installation

Follow the steps below to install and run the Quivr React Native Client:

1. Clone the repository:

```bash
git clone https://github.com/iMADi-ARCH/quivr-mobile.git
```

2. Navigate to the project directory:

```bash
cd quivr-mobile
```

3. Install the required dependencies:

```bash
yarn install
```

4. Set environment variables: Change the variables inside `.envrc.example` file with your own.

   a. **Option A**: Using `direnv`

   1. Install direnv - https://direnv.net/#getting-started
   2. Copy `.envrc.example` to `.envrc`

      ```bash
      cp .envrc.example .envrc
      ```

   3. Allow reading `.envrc`
      ```bash
      direnv allow .
      ```

   b. **Option B**: Set system wide environment variables by copying the content of `.envrc` and placing it at the bottom of your shell file e.g. `.bashrc` or `.zshrc`

5. Configure the backend API endpoints:
   Open the `config.ts` file and update the `BACKEND_PORT` and `PROD_BACKEND_DOMAIN` constants with the appropriate values corresponding to your Quivr backend.

6. Run the application:

```bash
yarn expo start
```

Then you can press `a` to run the app on an android emulator (given you already have Android studio setup)

## Contributing

Contributions to the Quivr React Native Client are welcome! If you encounter any issues or want to add features, please open an issue on the GitHub repository.

When contributing code, please follow the existing coding style and submit a pull request for review.

## Special Thanks

- [Stan Girard](https://github.com/stangirard) for making such a wonderful api 🫶
