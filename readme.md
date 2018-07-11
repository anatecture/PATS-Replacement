# PATS Prototype

This is a prototype of the new Patient Advocate system’s push notifications. It’s built with [Middleman](https://middlemanapp.com/).

## Development

### Running it locally

1. First, ensure you have a [Ruby](https://www.ruby-lang.org/en/) environment with [Bundler](http://bundler.io/) on your computer.
1. In your terminal, `cd` into this directory and run `bundle install`.
1. Run `bundle exec middleman` and go to [localhost:4567](http://localhost:4567/) in your browser.

### Building

After you have successfully run the app locally, use `bundle exec middleman build` to create a new build. It will be in the `/build/` directory.

## Features

### Notifications

As notifications are the main feature we’re testing with this, a few notifications tools are built into this. If you open the JavaScript console you can push new notifications via the `autoNotify()` function. If you wish to push a high priority notification you can push `autoNotify(1)`.

Specific notifications can be passed with the `notify()` function. The structure of the function looks like this: `notify('notification', 'firstName', 'lastName', 'caseNumber')`.

Notifications are scripted on lines 377 through 385 of `/source/javascripts.script.js`.

### Variations

There are two different variations of the prototype. `/source/index.html.erb` is the variation without styling on the notification indicator and `/source/index1.html.erb` has added styling around the notification indicator.
