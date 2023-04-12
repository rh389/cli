/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const fs = jest.requireActual('fs');
const path = jest.requireActual('path');

const readFixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, name), 'utf8');
const manifest = readFixture('./files/AndroidManifest.xml');
const mainJavaClass = readFixture('./files/Main.java');
const buildGradle = readFixture('./files/build.gradle');
const appBuildGradle = readFixture('./files/appbuild.gradle');

function generateValidFileStructureForLib(classFileName: string) {
  return {
    'build.gradle': buildGradle,
    src: {
      'AndroidManifest.xml': manifest,
      main: {
        com: {
          some: {
            example: {
              'Main.java': mainJavaClass,
              [classFileName]: readFixture(`./files/${classFileName}`),
            },
          },
        },
      },
    },
  };
}

function generateValidFileStructureForApp() {
  return {
    'build.gradle': buildGradle,
    app: {
      'build.gradle': appBuildGradle,
    },
    src: {
      'AndroidManifest.xml': manifest,
    },
  };
}

export const valid = generateValidFileStructureForLib('ReactPackage.java');

export const validKotlin = generateValidFileStructureForLib('ReactPackage.kt');

export const validApp = generateValidFileStructureForApp();

export const userConfigManifest = {
  src: {
    main: {
      'AndroidManifest.xml': manifest,
      com: {
        some: {
          example: {
            'Main.java': mainJavaClass,
            'ReactPackage.java': readFixture('./files/ReactPackage.java'),
          },
        },
      },
    },
    debug: {
      'AndroidManifest.xml': readFixture('./files/AndroidManifest-debug.xml'),
    },
  },
};

export const corrupted = {
  src: {
    'AndroidManifest.xml': manifest,
    main: {
      com: {
        some: {
          example: {},
        },
      },
    },
  },
};

export const noPackage = {
  src: {
    'AndroidManifest.xml': manifest,
    main: {
      com: {
        some: {
          example: {
            'Main.java': mainJavaClass,
          },
        },
      },
    },
  },
};

export const findPackagesClassNameKotlinValid = [
  `
  class SomeExampleKotlinPackage() : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage:ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage
    :
  ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage() : SomeDelegate, OtherDelegate, ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage(val name: String) : SomeDelegate, OtherDelegate, ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage : SomeSuper(), ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage : TurboReactPackage {

  }`,
];

export const findPackagesClassNameKotlinNotValid = [
  `
  class SomeExampleKotlinPackage() {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
  `
  class SomeExampleKotlinPackage {
    val package: ReactPackage = ReactPackage()
  }`,
  `
  class ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return Collections.emptyList()
    }
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<View>> {
       return Collections.emptyList()
    }
  }`,
];

export const findPackagesClassNameJavaValid = [
  `
  class SomeExampleKotlinPackage implements ReactPackage {
    
  }
  `,
  `
  class SomeExampleKotlinPackage implements SomePackage, ReactPackage {
    
  }
  `,
  `
  class SomeExampleKotlinPackage extends SomeSuper implements SomePackage, ReactPackage {
    
  }
  `,
  `
  class SomeExampleKotlinPackage
    implements
    SomePackage,
    ReactPackage {

  }
  `,
  `
  class SomeExampleKotlinPackage extends TurboReactPackage {

  }
  `,
  `
  class SomeExampleKotlinPackage
    extends
    TurboReactPackage {

  }
  `,
  `
  class SomeExampleKotlinPackage
    extends
    TurboReactPackage
    implements
    ReactPackage {

  }
  `,
];

export const findPackagesClassNameJavaNotValid = [
  `
  class SomeExampleKotlinPackage implements SomePackage {
    
  }
  `,
  `
  class ReactPackage {
    
  }
  `,
  `
  class SomeExampleKotlinPackage extends ReactPackage {
    
  }
  `,
  `
  class SomeExampleKotlinPackage {
    
  }
  `,
];
