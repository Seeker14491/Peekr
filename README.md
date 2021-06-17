# Peekr

Real-time Information display app for [Distance](http://survivethedistance.com/).

## Usage

To get the plugin working you'll first need to get the BepInEx modding framework installed in Distance ([instructions](https://docs.bepinex.dev/master/articles/user_guide/installation/index.html)). Note that [Centrifuge](https://github.com/Ciastex/Centrifuge) conflicts with BepInEx. [Spectrum](https://github.com/Ciastex/Spectrum), however, works fine alongside BepInEx.

Install the plugin by placing it in the `Distance/BepInEx/plugins/` directory. Your directory structure should end up looking like `Distance/BepInEx/plugins/PeekrPlugin/PeekrPlugin.dll`.

The plugin can be configured by editing the configuration file `Distance/BepInEx/config/pw.seekr.plugins.peekr.cfg`, which will be generated after running the game with the plugin installed.

Once the plugin is installed you can run the app which will show data once you're in-game.

## Architecture

The game plugin continually collects telemetry from the running game and sends it over UDP as JSON to the GUI application. The GUI is implemented with [React](https://reactjs.org/) + [Tauri](https://tauri.studio/).

## Building the plugin

Before building the plugin, you'll need to copy these dll files from your game folder to the `PeekrPlugin/Libs` directory (this assumes you have BepInEx installed in your game already):

- `Distance_Data/Managed/Assembly-CSharp.dll`
- `Distance_Data/Managed/UnityEngine.dll`
- `BepInEx/core/0Harmony.dll`
- `BepInEx/core/BepInEx.dll`

The plugin can then be built by builing the solution in the `PeekrPlugin` folder.

## Building the UI

You'll need to set up your system for Tauri; see [the Tauri docs](https://tauri.studio/en/docs/getting-started/intro). You'll also need [Yarn](https://yarnpkg.com/) installed.

To build the UI, inside the `peekr-ui` directory run:

```
yarn tauri build
```

The build output will be in the `peekr-ui/src-tauri/target/release` directory.
