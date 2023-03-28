# Dolores

A wrapper for the [discord.js](https://discord.js.org) `Client` that provides some additional boilerplate functionality to aid in quick prototyping of Discord bots:

- Command handling and registration
  - Slash commands
  - Context menu commands
- Logging
- Trigger-based responses
- Event handling
- Database emulation

## Status

There will be many breaking changes, particularly in the current v0.x.x stage. Documentation is provided within the source code to various degrees; web-based documentation will be coming at some point.

## Overview

Dolores extends the discord.js `Client` with a series of helper properties: `db`, `commands`, `events`, `triggers`, and `log` (alongside a couple others), and a method `init` which triggers a login, and separate `init` methods for each of the above properties.

The above properties are handled by a series of 'managers', to emulate the discord.js style for consistency. Most of these managers are themselves extensions of built-in structures such as `array`s and `map`s.

This project is intended as a utility for my own personal projects, so there are some opinionated stylistic choices (e.g. logging output).
