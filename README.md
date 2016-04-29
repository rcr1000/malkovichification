# Malkovichification
A useless script that turns all text on the page to repetitions of the word "Malkovich"

## Description
Inspired by a pseudo-famous scene from _Being John Malkovich_, this script will turn all of the text on the page to repetitions of the word Malkovich. The script matches character length of all replaced text, truncating at an even Malkovich, so that the length of every replaced grouping of text remains approximately the same as it was pre-Malkovichification.

There is pretty much no reason ever to use this script. The closest you could likely come to making it useful would be to change the value of the `malkovich` variable to some long *lorem ipsum* string in order to view a content-neutral version of a site.

## Requirements
[jQuery](https://jquery.com)

## Instructions
After you've made sure to include jQuery on your site, place the malkovichification folder somewhere in your project. Then you can Malkovichify any page on the site by placing the following in the page's HTML:

`<script src="/PATH/TO/malkovichification/malkovichification.js"></script>`
