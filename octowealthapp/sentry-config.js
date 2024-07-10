import * as Sentry from 'sentry-expo';

Sentry.init({
    dsn: "https://c624935b7b249c04b4120df25bb72b21@o4507120284729344.ingest.us.sentry.io/4507120289120256",
    enableInExpoDevelopment: true, // Optional: Captures errors in development
    debug: true // Optional: Shows debug information in the console
});

// You can configure additional Sentry options here if needed

export default Sentry;
