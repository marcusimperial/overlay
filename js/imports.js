const fetch = require('node-fetch');
const fs = require('fs');
const readLastLines = require('read-last-lines');
const path = require('path');
const {MongoClient} = require('mongodb');
const { ipcRenderer, app } = require('electron');
require('dotenv').config();