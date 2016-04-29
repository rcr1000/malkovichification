/**
 * Malkovichification
 *
 * This script alters the rendered text on the page to replace all strings with
 * repetitions of the word "Malkovich" in approximately matching character
 * lengths. DOM, markup, and styling are preserved.
 */

'use strict';
$(document).ready(function () {

  // The word we're using for Malkovichification ("Malkovich" by default).
  var malkovich = 'Malkovich';

  /**
   * Simple function to print replacement string ("Malkovich") `num` times.
   *
   * @param {number} num
   *   The number of times the replacement string should be printed.
   *
   * @return {string}
   *   The full chain of replacement strings to be printed.
   */
  function print_malk(num) {
    var malkLine = '';
    for (var i = 0; i < num; i++) {
      malkLine += malkovich + ' ';
    }

    return malkLine;
  }

  /**
   * The main operative function.
   */
  function malkovichify() {

    // Binary telling whether we should Malkovichify the document title.
    var malkReplaceTitle = true;

    if (malkReplaceTitle) {
      document.title = malkovich;
    }

    // Now get on with Malkovichifying the document body.
    var bod = document.body.innerHTML;
    var reg;
    var match;
    var allMatches = [];
    reg = /<.*?>/g;

    do {
      match = reg.exec(bod);
      if (match) {
        allMatches.push(match);
      }
    } while (match);

    /**
     * This array is a map of where text should be replaced.
     *
     * Store HTML tag strings, locations, and lengths in tagmap so we know
     * what to ignore when replacing text with "Malkovich".
     */
    var tagmap = [];
    var arrayLength = allMatches.length;
    for (i = 0; i < arrayLength; i++) {
      tagmap.push([
        allMatches[i][0],
        allMatches[i].index,
        allMatches[i][0].length
      ]);
    }

   /**
     * This variable quarantines stuff that shouldn't be touched.
     *
     * The noTouch variable is an array of ranges to not touch when
     * replacing HTML, based on the tagmap.
     */
    var noTouch = [];
    var startpoint;
    var endpoint;
    for (i = 0; i < tagmap.length; i++) {
      // Startpoint is the index of the given tag.
      startpoint = tagmap[i][1];
      // Endpoint is the index plus tag length.
      endpoint = startpoint + tagmap[i][2] - 1;
      noTouch.push([startpoint, endpoint]);
    }

    // Array of Malkovichified text to replace real text in order, in bod.
    var toReplace = [];
    var i;
    var n = 0;
    for (i = 0; i < noTouch.length; i++) {
      var translatable = '';

      /**
       * Replace text as long is we're not in a noTouch zone.
       *
       * Do this while the current index has not yet reached the startpoint
       * of the next noTouch.
       */
      while (n < noTouch[i][0]) {
        translatable += bod[n];
        n++;
      }
      toReplace.push(translatable);

      /**
       * Skip the noTouch zone.
       *
       * Skip to the end of the encountered noTouch zone, and pick up loop
       * immediately after.
       */
      n = noTouch[i][1] + 1;
    }

    // This var stores all "Malkovich" chains that we want to place.
    var replacements = [];
    var y;
    for (y = 0; y < toReplace.length; y++) {

      // If the string is not just spaces.
      if ($.trim(toReplace[y]) !== '') {

        /**
         * Calculate the appropriate number of "Malkovich"es.
         *
         * Calculate the number of "Malkovich"es that should replace the
         * original string.
         */
        var malkCount = Math.ceil(toReplace[y].length / malkovich.length);
        replacements.push(print_malk(malkCount));
      } else {
        // Otherwise keep the spaces as they are.
        replacements.push(toReplace[y]);
      }
    }

    var z = 0;
    // Newbod is the final reconstructed output with original markup.
    var newbod = '';
    for (z = 0; z < tagmap.length; z++) {

      /**
       * Create the new HTML body.
       *
       * Since the saved markup and the replacement "Malkovich" text are
       * stored in the same order as the original page was constructed,
       * we print them back out one at a time to reconstruct the page:
       * rendered text, markup, rendered text, markup, ...
       */
      newbod += replacements[z];
      newbod += tagmap[z][0];
    }

    $('body').html(newbod);
  }

  // Do it.
  malkovichify();

});
