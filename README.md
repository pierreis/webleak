# Webleak 🌊

Account leaks are all but infrequent these days. Webleak is a simple tool that will periodically check for leaks for your
account in large databases. Should one of your accounts be exposed, you will be instantly notified so you can take the
appropriate measures (who said changing your password, and, even better, enable multi-factor authentication?).

Webleak is a serverless tool running on [Webtask](https://webtask.io) from the folks at [Auth0](https://auth0.com). A free plan
that offerso mre than enough resources for Webleak is available.

**This software is a proof of concept at the moment**, so notifications are only supported via text message with Twilio, which
is cool enough. No doubt that you can easily extend to notify you via e-mail, smoke signals or avian carrier if needed.

## What you will need:

 - A Webstack account (which is free)
 - A Twitter account (which is optional but recommended, and free)
 - A Twilio account (which is free to try, and very inexpensive thereafter)
 - Node and NPM (or Yarn) installed

## Why triggers instead of checking databases regularly?

Checking leak databases can be costly. Furthermore, the API limits are very tight. Twitter infrastructure is much less
likely to be saturated and has much more generous API limits!

However, should you not define triggers for Webleak, the leak database will be accessed on each invocation.

## Getting started

First, you need to clone this repository:

    $ git clone https://github.com/pierreis/webleak
    $ cd webleak
    $ yarn install  // or npm install if you are old-school

The package includes very simple configuration scripts based on [Gulp](https://gulpjs.com) to make configuration a breeze.

    $ yarn run bundle
    $ yarn run configure
    $ yarn run deploy

<p align="center"> 
<img src="https://raw.githubusercontent.com/pierreis/webleak/master/images/configure.png">
</p>

All these steps can be combined into one:

    $ yarn start

<p align="center"> 
<img src="https://raw.githubusercontent.com/pierreis/webleak/master/images/text.png">
</p>

## Notes

 - The data is fetched by default from the awesome [Have I Been Pwned](https://haveibeenpwned.com) database,
 - The database check is triggered by new tweets on their account, which generally corresponds to new leaks,
 - The defaults are to check for new leaks every hour,
 - You will not be notified multiple times about the same leaks.

## Advanced config

The command line configuration tool is great for getting started, but ultimately you can find yourself limited, and will want to
edit the configuration file by yourself. 
The configuration file lies in `dist/config.json` after bundle, and is pretty self-explanatory.