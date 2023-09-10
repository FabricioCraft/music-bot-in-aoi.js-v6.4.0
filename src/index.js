const { LoadCommands, AoiClient } = require("aoi.js");
const { Manager } = require("@akarui/aoi.music");
const keepAlive = require(`./handler/server.js`);
const { Util } = require('aoi.js');
const {
  AoiVoice,
  PlayerEvents,
  PluginName,
  Cacher,
  Filter,
} = require(`@akarui/aoi.music`);


const bot = new AoiClient({
  token: "O token do seu bot",
  prefix: "prefixo do bot",
  intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue"
    }

  },

  suppressAllErrors: true

})
const loader = new LoadCommands(bot);
loader.load(bot.cmd, "./commands/")
require('./handler/variables.js')(bot);
const voice = new AoiVoice(bot, {
  requestOptions: {
    offsetTimeout: 0,
    soundcloudLikeTrackLimit: 200,
  },
  searchOptions: {
    soundcloudClientId: "",

  },
});
loader.load(voice.cmds, "./voice/")
voice.bindExecutor(bot.functionManager.interpreter);
voice.addEvent(PlayerEvents.TRACK_START);
voice.addEvent(PlayerEvents.TRACK_END);
voice.addEvent(PlayerEvents.QUEUE_END);
voice.addEvent(PlayerEvents.QUEUE_START);
voice.addEvent(PlayerEvents.AUDIO_ERROR);
voice.addEvent(PlayerEvents.TRACK_PAUSE);
voice.addEvent(PlayerEvents.TRACK_RESUME);
voice.addPlugin(PluginName.Cacher, new Cacher("disk" /* or "memory" */));
voice.addPlugin(PluginName.Filter, new Filter({
  filterFromStart: false,
}));

// Status
bot.status({
    text: "Fui feito em aoi.js",
    type: "PLAYING",
    status: "idle",
    time: 12
});  
