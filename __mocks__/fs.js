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
    jest.doMock('path');
    jest.doMock('memfs/lib/process', () => ({
      default: {platform, cwd: () => root},
    }));
    require('path').mock.reset(platform);
    const {vol, fs: mockFS} = require('memfs');
    vol.reset();
    vol.fromNestedJSON(object, root);
    Object.assign(module.exports, mockFS);
  });
  return root;
};
