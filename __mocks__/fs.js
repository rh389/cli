/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

jest.isolateModules(() => {
  const {fs} = require('memfs');
  module.exports = fs;
});

module.exports.__setMockFilesystem = (object, platform = 'posix') => {
  const root = platform === 'win32' ? 'C:\\' : '/';
  jest.isolateModules(() => {
    // Hack: memfs doesn't have first-class support for emulating a platform,
    // so we mock its internal process wrapper to fool it into thinking it's
    // running under `platform`.
    jest.doMock('memfs/lib/process', () => ({
      default: {platform, cwd: () => root},
    }));
    // Because we're in isolateModules, this needs to be set here explicitly
    // even if it's already set by the test file.
    jest.doMock('path');
    require('path').mock.reset(platform);
    const {vol, fs} = require('memfs');
    vol.fromNestedJSON(object, root);
    Object.assign(module.exports, fs);
  });
  return root;
};
