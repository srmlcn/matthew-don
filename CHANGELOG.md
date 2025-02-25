# Changelog

## <small>3.4.1 (2025-02-25)</small>

### Bug Fixes

* format paragraphs with prose ([7128483](https://github.com/cainspencerm/matthew-don/commit/71284833b7cd1cb5d8fd5396e968838902d470f6))

## 3.4.0 (2025-02-25)

### Features

* slide sections into view on viewport entry ([b34246f](https://github.com/cainspencerm/matthew-don/commit/b34246fec2921b43bb0dd9a59e4cdc467dac0d4f))

## 3.3.0 (2025-02-25)

### Features

* add momentum to the swipe behavior of the carousel component ([822a84a](https://github.com/cainspencerm/matthew-don/commit/822a84ae5c860c404fd97d2e4d96e4dd8f9ee461))

## <small>3.2.1 (2025-02-25)</small>

### Bug Fixes

* render aspect ratios correctly in responsive layouts ([015b03d](https://github.com/cainspencerm/matthew-don/commit/015b03de6619c2930d32abca0311492dd0951fe3))

## 3.2.0 (2025-02-24)

### Features

* move book info to a book data file ([1bd85a9](https://github.com/cainspencerm/matthew-don/commit/1bd85a99abf3aae49a086e9df3926267b14b4cee))
* move components to separate component files ([d848f73](https://github.com/cainspencerm/matthew-don/commit/d848f7352127d10575e0753cc883f66529af59b2))

## <small>3.1.2 (2025-02-17)</small>

### Bug Fixes

* render link buttons columnwise ([98b9f65](https://github.com/cainspencerm/matthew-don/commit/98b9f657665d52cf6b99cf5059e0f727066bb6dd)), closes [#17](https://github.com/cainspencerm/matthew-don/issues/17)

## <small>3.1.1 (2025-02-17)</small>

### Bug Fixes

* statically render background colors for link buttons ([26b4b73](https://github.com/cainspencerm/matthew-don/commit/26b4b730b063d49fcd7b5ae78653c3c0c259befc))

## 3.1.0 (2025-02-16)

### Features

* add goodreads links for each book ([9ca60f4](https://github.com/cainspencerm/matthew-don/commit/9ca60f4aff16459b8fd9d96219e6a7b59a2571c0)), closes [#15](https://github.com/cainspencerm/matthew-don/issues/15)

## 3.0.0 (2025-02-16)

* feat!: support vendor-specific links ([91e083f](https://github.com/cainspencerm/matthew-don/commit/91e083f8ebf60bd3ab914d254e366f54c114abe8)), closes [#14](https://github.com/cainspencerm/matthew-don/issues/14)


### BREAKING CHANGES

* the "external" field type has changed to support the "vendor" field

## 2.2.0 (2025-02-16)

### Features

* customize link buttons based on the vendor ([82b2c1d](https://github.com/cainspencerm/matthew-don/commit/82b2c1d441ee52c238d0c99d21bbe1bed918a73b)), closes [#13](https://github.com/cainspencerm/matthew-don/issues/13)

## 2.1.0 (2025-02-15)

### Features

* add preview image carousels to book pages ([a8f882a](https://github.com/cainspencerm/matthew-don/commit/a8f882a5287bda0d47107ce247f1003accc409d5)), closes [#12](https://github.com/cainspencerm/matthew-don/issues/12)

## 2.0.0 (2025-02-13)

* feat!: separate link data into external (amazon) and internal (page) data ([0bfdacc](https://github.com/cainspencerm/matthew-don/commit/0bfdacc5446db4c5633f37979473d5935a7eb0c6))


### Bug Fixes

* import BookProps using type syntax ([a98eab6](https://github.com/cainspencerm/matthew-don/commit/a98eab63225bb3850e1849cdebfab113156b587d))


### Features

* add hyperlinks to books ([4667ce2](https://github.com/cainspencerm/matthew-don/commit/4667ce24bb96abc8633f94de67a8138b284779d7)), closes [#11](https://github.com/cainspencerm/matthew-don/issues/11)


### BREAKING CHANGES

* LinkData is fundamentally different, now supporting internal and external links

## <small>1.6.1 (2025-02-13)</small>

### Bug Fixes

* reduce transparency of the site navigation menu ([6ff12f3](https://github.com/cainspencerm/matthew-don/commit/6ff12f31c2b1c30548cabe06b407679a46550848))

## 1.6.0 (2025-02-11)

### Features

* create a site footer ([dc90e0d](https://github.com/cainspencerm/matthew-don/commit/dc90e0d2885e110c5c1c3facfac4589fafe53e53)), closes [#10](https://github.com/cainspencerm/matthew-don/issues/10)
* create a site footer ([b148106](https://github.com/cainspencerm/matthew-don/commit/b14810618a00bfc01525c9e715271981067f05d2))

## <small>1.5.2 (2025-02-11)</small>

### Bug Fixes

* make the about page images responsive ([0eb4470](https://github.com/cainspencerm/matthew-don/commit/0eb4470ca6cd48fac71b22f6aec5c67d5149ad8c))
* make the book page images responsive ([60f9967](https://github.com/cainspencerm/matthew-don/commit/60f996734b684a63d343f4c9722601d638c8f3b0))
* make the contact page images responsive ([0b5c8e3](https://github.com/cainspencerm/matthew-don/commit/0b5c8e393e7ce63af1639f57258ca2d085ba3920))
* make the home page images responsive ([deaf37b](https://github.com/cainspencerm/matthew-don/commit/deaf37bc9b84525f5bf860cc0e4071d707f9fe90))

## <small>1.5.1 (2025-02-11)</small>

### Bug Fixes

* make page components responsive ([9986fad](https://github.com/cainspencerm/matthew-don/commit/9986fad1b60f4375a403e5b93b86d1b8104176f6)), closes [#8](https://github.com/cainspencerm/matthew-don/issues/8)

## 1.5.0 (2025-02-11)

### Features

* add metadata to pages ([be97069](https://github.com/cainspencerm/matthew-don/commit/be97069d007966059949cbe7619bf5023d8a0bb8)), closes [#6](https://github.com/cainspencerm/matthew-don/issues/6)
* add metadata to the about page ([7e9906c](https://github.com/cainspencerm/matthew-don/commit/7e9906c6b95d2a82e7c5f0234a5e3d2a4a1f8381))
* add metadata to the adventures book page ([c209234](https://github.com/cainspencerm/matthew-don/commit/c209234ca8cd90e6838ddd759d56a3986039e100))
* add metadata to the celebration book page ([723725b](https://github.com/cainspencerm/matthew-don/commit/723725b8d2f7338c696e0162399ac98e7591ebc0))
* add metadata to the contact page ([0d2f350](https://github.com/cainspencerm/matthew-don/commit/0d2f350de9023379d1c6b236308116648bad4c8e))
* add metadata to the home page ([afd6e2a](https://github.com/cainspencerm/matthew-don/commit/afd6e2a4310c1cb86806b2c326d2f005a6d6afd8))

## <small>1.4.1 (2025-02-11)</small>

### Bug Fixes

* restore matthew-don.jpg ([7641f99](https://github.com/cainspencerm/matthew-don/commit/7641f9940e1926bb782269de72441f99920915f3))

## 1.4.0 (2025-02-11)

### Features

* add image data for book page template ([2ec2368](https://github.com/cainspencerm/matthew-don/commit/2ec2368285addd6ac688c863babb90d7a0afd4c6))
* add images for book page template ([b2ad258](https://github.com/cainspencerm/matthew-don/commit/b2ad2580b8c40ced679192806c5c6ea7551cafa3))
* add review data for book page template ([996da5f](https://github.com/cainspencerm/matthew-don/commit/996da5f3c7380d8d5f837b72a0455d12ad4a55b0))
* create the celebrations book page ([1e15e06](https://github.com/cainspencerm/matthew-don/commit/1e15e069ca4d36209475949d71b610df6428c938))
* create the celebrations book page ([92f9a5e](https://github.com/cainspencerm/matthew-don/commit/92f9a5e8e38df39e31822419a40301c56c66ac85))

## 1.3.0 (2025-02-11)

### Features

* add image data for book page template ([c966f79](https://github.com/cainspencerm/matthew-don/commit/c966f7956fb0eeefa6836d69217a2b77c1cc1ee8))
* add images for book page template ([f859304](https://github.com/cainspencerm/matthew-don/commit/f859304095dc8f74972ecc3cbdc8b8da44905c4a))
* add review data for book page template ([5907259](https://github.com/cainspencerm/matthew-don/commit/59072594c597e2bb9d7700754f4293fc28c24ef9))
* create a book page template ([e674bcf](https://github.com/cainspencerm/matthew-don/commit/e674bcfc945687129a7e839a76cb3cf6625149c0))
* create the adventures book 1 page ([b2558a5](https://github.com/cainspencerm/matthew-don/commit/b2558a50e445f861dd27344ea55180e474dd855a))
* create the adventures book 1 page ([60d21dc](https://github.com/cainspencerm/matthew-don/commit/60d21dc577a3fc73805d32d6c56c521d675f171e))

## 1.2.0 (2025-02-11)

### Features

* create a contact page ([7d3f388](https://github.com/cainspencerm/matthew-don/commit/7d3f38838c2cbfbdb72ce943147b22a72ee0c382))

## 1.1.0 (2025-02-11)

### Features

* create an about page ([0241b52](https://github.com/cainspencerm/matthew-don/commit/0241b52474b0649c12f5cea1b1b22e0005379ca9))

## 1.0.0 (2025-02-11)

### Features

* add a navbar to the root layout ([38c1a65](https://github.com/cainspencerm/matthew-don/commit/38c1a6571e20ffa03be35b0c5a25af6da043f54e))
* add image data for book display cards ([7066238](https://github.com/cainspencerm/matthew-don/commit/7066238707ff1a6c437e4150e17a6f2f79f2cbdd))
* add images for book display cards ([8ccf194](https://github.com/cainspencerm/matthew-don/commit/8ccf194bd53b095115d2455c371e05dc05a13d14))
* add link data for book display cards ([6ba6589](https://github.com/cainspencerm/matthew-don/commit/6ba65891f7785b30d54dc65a06cdb4df4016f600))
* configure heroui layout provider ([0a527e0](https://github.com/cainspencerm/matthew-don/commit/0a527e07bd1662d6642053089ee78ed060de6bc7))
* create a book display card ([04ce429](https://github.com/cainspencerm/matthew-don/commit/04ce4291b16bdc4047b03e3f693ce5a535abb47d))
* create a contact invitation component ([826e217](https://github.com/cainspencerm/matthew-don/commit/826e217dd3950b2ce19f69d714319e68d17a8514))
* create a home page ([2c197d8](https://github.com/cainspencerm/matthew-don/commit/2c197d8776193e632d9b33e7759b9ba721992342)), closes [#2](https://github.com/cainspencerm/matthew-don/issues/2)
* create a home page ([58d7b60](https://github.com/cainspencerm/matthew-don/commit/58d7b6061c7136b4671e89adfa1bcbfd904d765f))
