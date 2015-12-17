module.exports = {
	php: {
		http: [{
			"method": "header()",
			"doc": "http://php.net/manual/en/function.header.php",
			"title": "Sends a raw HTTP header to a client"
		}, {
			"method": "headers_list()",
			"doc": "http://php.net/manual/en/function.headers-list.php",
			"title": "Returns a list of response headers sent "
		}, {
			"method": "headers_sent()",
			"doc": "http://php.net/manual/en/function.headers-sent.php",
			"title": "Checks if "
		}, {
			"method": "setcookie()",
			"doc": "http://php.net/manual/en/function.setcookie.php",
			"title": "Sends an HTTP cookie to a client"
		}, {
			"method": "setrawcookie()",
			"doc": "http://php.net/manual/en/function.setrawcookie.php",
			"title": "Sends an HTTP cookie without URL encoding the cookie value"
		}],
		variables: [{
			"method": "boolval()",
			"doc": "http://www.php.net/manual/en/function.boolval.php",
			"title": "Get the boolean value of a variable"
		}, {
			"method": "debug_zval_dump()",
			"doc": "http://www.php.net/manual/en/function.debug-zval-dump.php",
			"title": "Dumps a string representation of an internal zend value to output"
		}, {
			"method": "doubleval()",
			"doc": "http://www.php.net/manual/en/function.doubleval.php",
			"title": "Alias of floatval"
		}, {
			"method": "empty()",
			"doc": "http://www.php.net/manual/en/function.empty.php",
			"title": "Determine whether a variable is empty"
		}, {
			"method": "floatval()",
			"doc": "http://www.php.net/manual/en/function.floatval.php",
			"title": "Get float value of a variable"
		}, {
			"method": "get_defined_vars()",
			"doc": "http://www.php.net/manual/en/function.get-defined-vars.php",
			"title": "Returns an array of all defined variables"
		}, {
			"method": "get_resource_type()",
			"doc": "http://www.php.net/manual/en/function.get-resource-type.php",
			"title": "Returns the resource type"
		}, {
			"method": "gettype()",
			"doc": "http://www.php.net/manual/en/function.gettype.php",
			"title": "Get the type of a variable"
		}, {
			"method": "import_request_variables()",
			"doc": "http://www.php.net/manual/en/function.import-request-variables.php",
			"title": "Import GET"
		}, {
			"method": "intval()",
			"doc": "http://www.php.net/manual/en/function.intval.php",
			"title": "Get the integer value of a variable"
		}, {
			"method": "is_array()",
			"doc": "http://www.php.net/manual/en/function.is-array.php",
			"title": "Finds whether a variable is an array"
		}, {
			"method": "is_bool()",
			"doc": "http://www.php.net/manual/en/function.is-bool.php",
			"title": "Finds out whether a variable is a boolean"
		}, {
			"method": "is_callable()",
			"doc": "http://www.php.net/manual/en/function.is-callable.php",
			"title": "Verify that the contents of a variable can be called as a function"
		}, {
			"method": "is_double()",
			"doc": "http://www.php.net/manual/en/function.is-double.php",
			"title": "Alias of is_float"
		}, {
			"method": "is_float()",
			"doc": "http://www.php.net/manual/en/function.is-float.php",
			"title": "Finds whether the type of a variable is float"
		}, {
			"method": "is_int()",
			"doc": "http://www.php.net/manual/en/function.is-int.php",
			"title": "Find whether the type of a variable is integer"
		}, {
			"method": "is_integer()",
			"doc": "http://www.php.net/manual/en/function.is-integer.php",
			"title": "Alias of is_int"
		}, {
			"method": "is_long()",
			"doc": "http://www.php.net/manual/en/function.is-long.php",
			"title": "Alias of is_int"
		}, {
			"method": "is_null()",
			"doc": "http://www.php.net/manual/en/function.is-null.php",
			"title": "Finds whether a variable is NULL"
		}, {
			"method": "is_numeric()",
			"doc": "http://www.php.net/manual/en/function.is-numeric.php",
			"title": "Finds whether a variable is a number or a numeric string"
		}, {
			"method": "is_object()",
			"doc": "http://www.php.net/manual/en/function.is-object.php",
			"title": "Finds whether a variable is an object"
		}, {
			"method": "is_real()",
			"doc": "http://www.php.net/manual/en/function.is-real.php",
			"title": "Alias of is_float"
		}, {
			"method": "is_resource()",
			"doc": "http://www.php.net/manual/en/function.is-resource.php",
			"title": "Finds whether a variable is a resource"
		}, {
			"method": "is_scalar()",
			"doc": "http://www.php.net/manual/en/function.is-scalar.php",
			"title": "Finds whether a variable is a scalar"
		}, {
			"method": "is_string()",
			"doc": "http://www.php.net/manual/en/function.is-string.php",
			"title": "Find whether the type of a variable is string"
		}, {
			"method": "isset()",
			"doc": "http://www.php.net/manual/en/function.isset.php",
			"title": "Determine if a variable is set and is not NULL"
		}, {
			"method": "print_r()",
			"doc": "http://www.php.net/manual/en/function.print-r.php",
			"title": "Prints human-readable information about a variable"
		}, {
			"method": "serialize()",
			"doc": "http://www.php.net/manual/en/function.serialize.php",
			"title": "Generates a storable representation of a value"
		}, {
			"method": "settype()",
			"doc": "http://www.php.net/manual/en/function.settype.php",
			"title": "Set the type of a variable"
		}, {
			"method": "strval()",
			"doc": "http://www.php.net/manual/en/function.strval.php",
			"title": "Get string value of a variable"
		}, {
			"method": "unserialize()",
			"doc": "function.unserialize.php",
			"title": "Creates a PHP value from a stored representation"
		}, {
			"method": "unset()",
			"doc": "http://www.php.net/manual/en/function.unset.php",
			"title": "Unset a given variable"
		}, {
			"method": "var_dump()",
			"doc": "http://www.php.net/manual/en/function.var-dump.php",
			"title": "Dumps information about a variable"
		}, {
			"method": "var_export()",
			"doc": "http://www.php.net/manual/en/function.var-export.php",
			"title": "Outputs or returns a parsable string representation of a variable"
		}],
		directory: [{
			"method": "chdir()",
			"doc": "http://php.net/manual/en/function.chdir.php",
			"title": "Changes the current directory"
		}, {
			"method": "chroot()",
			"doc": "http://php.net/manual/en/function.chroot.php",
			"title": "Changes the root directory of the current process"
		}, {
			"method": "dir()",
			"doc": "http://php.net/manual/en/function.dir.php",
			"title": "Opens a directory handle and returns an object"
		}, {
			"method": "closedir()",
			"doc": "http://php.net/manual/en/function.closedir.php",
			"title": "Closes a directory handle"
		}, {
			"method": "getcwd()",
			"doc": "http://php.net/manual/en/function.getcwd.php",
			"title": "Returns the current directory"
		}, {
			"method": "opendir()",
			"doc": "http://php.net/manual/en/function.opendir.php",
			"title": "Opens a directory handle"
		}, {
			"method": "readdir()",
			"doc": "http://php.net/manual/en/function.readdir.php",
			"title": "Returns an entry from a directory handle"
		}, {
			"method": "rewinddir()",
			"doc": "http://php.net/manual/en/function.rewinddir.php",
			"title": "Resets a directory handle"
		}, {
			"method": "scandir()",
			"doc": "http://php.net/manual/en/function.scandir.php",
			"title": "Lists files and directories inside a specified path"
		}],
		strings: [{
			"method": "addcslashes()",
			"doc": "http://php.net/manual/en/function.addcslashes.php",
			"title": "Returns a string with backslashes in front of the specified characters"
		}, {
			"method": "addslashes()",
			"doc": "http://php.net/manual/en/function.addslashes.php",
			"title": "Returns a string with backslashes in front of predefined characters"
		}, {
			"method": "bin2hex()",
			"doc": "http://php.net/manual/en/function.bin2hex.php",
			"title": "Converts a string of ASCII characters to hexadecimal values"
		}, {
			"method": "chop()",
			"doc": "http://php.net/manual/en/function.rtrim.php",
			"title": "Alias of rtrim"
		}, {
			"method": "chr()",
			"doc": "http://php.net/manual/en/function.chr.php",
			"title": "Returns a character from a specified ASCII value"
		}, {
			"method": "chunk_split()",
			"doc": "http://php.net/manual/en/function.chunk-split.php",
			"title": "Splits a string into a series of smaller parts"
		}, {
			"method": "convert_cyr_string()",
			"doc": "http://php.net/manual/en/function.convert-cyr-string.php",
			"title": "Converts a string from one Cyrillic character-set to another"
		}, {
			"method": "convert_uudecode()",
			"doc": "http://php.net/manual/en/function.convert-uudecode.php",
			"title": "Decodes a uuencoded string"
		}, {
			"method": "convert_uuencode()",
			"doc": "http://php.net/manual/en/function.convert-uuencode.php",
			"title": "Encodes a string using the uuencode algorithm"
		}, {
			"method": "count_chars()",
			"doc": "http://php.net/manual/en/function.count-chars.php",
			"title": "Returns how many times an ASCII character occurs within a string and returns the information"
		}, {
			"method": "crc32()",
			"doc": "http://php.net/manual/en/function.crc32.php",
			"title": "Calculates a 32-bit CRC for a string"
		}, {
			"method": "crypt()",
			"doc": "http://php.net/manual/en/function.crypt.php",
			"title": "One-way string encryption "
		}, {
			"method": "echo()",
			"doc": "http://php.net/manual/en/function.echo.php",
			"title": "Outputs strings"
		}, {
			"method": "explode()",
			"doc": "http://php.net/manual/en/function.explode.php",
			"title": "Breaks a string into an array"
		}, {
			"method": "fprintf()",
			"doc": "http://php.net/manual/en/function.fprintf.php",
			"title": "Writes a formatted string to a specified output stream"
		}, {
			"method": "get_html_translation_table()",
			"doc": "http://php.net/manual/en/function.htmlspecialchars.php",
			"title": "Returns the translation table used by htmlspecialchars"
		}, {
			"method": "hebrev()",
			"doc": "http://php.net/manual/en/function.hebrev.php",
			"title": "Converts Hebrew text to visual text"
		}, {
			"method": "hebrevc()",
			"doc": "http://php.net/manual/en/function.hebrevc.php",
			"title": "Converts Hebrew text to visual text and new lines "
		}, {
			"method": "html_entity_decode()",
			"doc": "http://php.net/manual/en/function.html-entity-decode.php",
			"title": "Converts HTML entities to characters"
		}, {
			"method": "htmlentities()",
			"doc": "http://php.net/manual/en/function.htmlentities.php",
			"title": "Converts characters to HTML entities"
		}, {
			"method": "htmlspecialchars_decode()",
			"doc": "http://php.net/manual/en/function.htmlspecialchars-decode.php",
			"title": "Converts some predefined HTML entities to characters"
		}, {
			"method": "htmlspecialchars()",
			"doc": "http://php.net/manual/en/function.htmlspecialchars.php",
			"title": "Converts some predefined characters to HTML entities"
		}, {
			"method": "implode()",
			"doc": "http://php.net/manual/en/function.implode.php",
			"title": "Returns a string from the elements of an array"
		}, {
			"method": "join()",
			"doc": "http://php.net/manual/en/function.join.php",
			"title": "Alias of implode"
		}, {
			"method": "levenshtein()",
			"doc": "http://php.net/manual/en/function.levenshtein.php",
			"title": "Returns the Levenshtein distance between two strings"
		}, {
			"method": "localeconv()",
			"doc": "http://php.net/manual/en/function.localeconv.php",
			"title": "Returns locale numeric and monetary formatting information"
		}, {
			"method": "ltrim()",
			"doc": "http://php.net/manual/en/function.ltrim.php",
			"title": "Strips whitespace from the left side of a string"
		}, {
			"method": "md5()",
			"doc": "http://php.net/manual/en/function.md5.php",
			"title": "Calculates the MD5 hash of a string"
		}, {
			"method": "md5_file()",
			"doc": "http://php.net/manual/en/function.md5-file.php",
			"title": "Calculates the MD5 hash of a file"
		}, {
			"method": "metaphone()",
			"doc": "http://php.net/manual/en/function.metaphone.php",
			"title": "Calculates the metaphone key of a string"
		}, {
			"method": "money_format()",
			"doc": "http://php.net/manual/en/function.money-format.php",
			"title": "Returns a string formatted as a currency string"
		}, {
			"method": "nl_langinfo()",
			"doc": "http://php.net/manual/en/function.nl-langinfo.php",
			"title": "Returns specific local information"
		}, {
			"method": "nl2br()",
			"doc": "http://php.net/manual/en/function.nl2br.php",
			"title": "Inserts HTML line breaks in front of each newline in a string"
		}, {
			"method": "number_format()",
			"doc": "http://php.net/manual/en/function.number-format.php",
			"title": "Formats a number with grouped thousands"
		}, {
			"method": "ord()",
			"doc": "http://php.net/manual/en/function.ord.php",
			"title": "Returns the ASCII value of the first character of a string"
		}, {
			"method": "parse_str()",
			"doc": "http://php.net/manual/en/function.parse-str.php",
			"title": "Parses a query string into variables"
		}, {
			"method": "print()",
			"doc": "http://php.net/manual/en/function.print.php",
			"title": "Outputs a string"
		}, {
			"method": "printf()",
			"doc": "http://php.net/manual/en/function.printf.php",
			"title": "Outputs a formatted string"
		}, {
			"method": "quoted_printable_decode()",
			"doc": "http://php.net/manual/en/function.quoted-printable-decode.php",
			"title": "Decodes a quoted-printable string"
		}, {
			"method": "quotemeta()",
			"doc": "http://php.net/manual/en/function.quotemeta.php",
			"title": "Quotes meta characters"
		}, {
			"method": "rtrim()",
			"doc": "http://php.net/manual/en/function.rtrim.php",
			"title": "Strips whitespace from the right side of a string"
		}, {
			"method": "setlocale()",
			"doc": "http://php.net/manual/en/function.setlocale.php",
			"title": "Sets locale information"
		}, {
			"method": "sha1()",
			"doc": "http://php.net/manual/en/function.sha1.php",
			"title": "Calculates the SHA-1 hash of a string"
		}, {
			"method": "sha1_file()",
			"doc": "http://php.net/manual/en/function.sha1-file.php",
			"title": "Calculates the SHA-1 hash of a file"
		}, {
			"method": "similar_text()",
			"doc": "http://php.net/manual/en/function.similar-text.php",
			"title": "Calculates the similarity between two strings"
		}, {
			"method": "soundex()",
			"doc": "http://php.net/manual/en/function.soundex.php",
			"title": "Calculates the soundex key of a string"
		}, {
			"method": "sprintf()",
			"doc": "http://php.net/manual/en/function.sprintf.php",
			"title": "Writes a formatted string to a variable"
		}, {
			"method": "sscanf()",
			"doc": "http://php.net/manual/en/function.sscanf.php",
			"title": "Parses input from a string according to a format"
		}, {
			"method": "str_ireplace()",
			"doc": "http://php.net/manual/en/function.str-ireplace.php",
			"title": "Replaces some characters in a string "
		}, {
			"method": "str_pad()",
			"doc": "http://php.net/manual/en/function.str-pad.php",
			"title": "Pads a string to a new length"
		}, {
			"method": "str_repeat()",
			"doc": "http://php.net/manual/en/function.str-repeat.php",
			"title": "Repeats a string a specified number of times"
		}, {
			"method": "str_replace()",
			"doc": "http://php.net/manual/en/function.str-replace.php",
			"title": "Replaces some characters in a string "
		}, {
			"method": "str_rot13()",
			"doc": "http://php.net/manual/en/function.str-rot13.php",
			"title": "Performs the ROT13 encoding on a string"
		}, {
			"method": "str_shuffle()",
			"doc": "http://php.net/manual/en/function.str-shuffle.php",
			"title": "Randomly shuffles all characters in a string"
		}, {
			"method": "str_split()",
			"doc": "http://php.net/manual/en/function.str-split.php",
			"title": "Splits a string into an array"
		}, {
			"method": "str_word_count()",
			"doc": "http://php.net/manual/en/function.str-word-count.php",
			"title": "Count the number of words in a string"
		}, {
			"method": "strcasecmp()",
			"doc": "http://php.net/manual/en/function.strcasecmp.php",
			"title": "Compares two strings "
		}, {
			"method": "strchr()",
			"doc": "http://php.net/manual/en/function.strchr.php",
			"title": "Finds the first occurrence of a string inside another string "
		}, {
			"method": "strcmp()",
			"doc": "http://php.net/manual/en/function.strcmp.php",
			"title": "Compares two strings "
		}, {
			"method": "strcoll()",
			"doc": "http://php.net/manual/en/function.strcoll.php",
			"title": "Locale based string comparison"
		}, {
			"method": "strcspn()",
			"doc": "http://php.net/manual/en/function.strcspn.php",
			"title": "Returns the number of characters found in a string before any part of some specified characters are found"
		}, {
			"method": "strip_tags()",
			"doc": "http://php.net/manual/en/function.strip-tags.php",
			"title": "Strips HTML and PHP tags from a string"
		}, {
			"method": "stripcslashes()",
			"doc": "http://php.net/manual/en/function.addcslashes.php",
			"title": "Unquotes a string quoted with addcslashes"
		}, {
			"method": "stripslashes()",
			"doc": "http://php.net/manual/en/function.addslashes.php",
			"title": "Unquotes a string quoted with addslashes"
		}, {
			"method": "stripos()",
			"doc": "http://php.net/manual/en/function.stripos.php",
			"title": "Returns the position of the first occurrence of a string inside another string "
		}, {
			"method": "stristr()",
			"doc": "http://php.net/manual/en/function.stristr.php",
			"title": "Finds the first occurrence of a string inside another string "
		}, {
			"method": "strlen()",
			"doc": "http://php.net/manual/en/function.strlen.php",
			"title": "Returns the length of a string"
		}, {
			"method": "strncasecmp()",
			"doc": "http://php.net/manual/en/function.strncasecmp.php",
			"title": "String comparison of the first n characters "
		}, {
			"method": "strncmp()",
			"doc": "http://php.net/manual/en/function.strncmp.php",
			"title": "String comparison of the first n characters "
		}, {
			"method": "strpbrk()",
			"doc": "http://php.net/manual/en/function.strpbrk.php",
			"title": "Searches a string for any of a set of characters"
		}, {
			"method": "strpos()",
			"doc": "http://php.net/manual/en/function.strpos.php",
			"title": "Returns the position of the first occurrence of a string inside another string "
		}, {
			"method": "strrchr()",
			"doc": "http://php.net/manual/en/function.strrchr.php",
			"title": "Finds the last occurrence of a string inside another string"
		}, {
			"method": "strrev()",
			"doc": "http://php.net/manual/en/function.strrev.php",
			"title": "Reverses a string"
		}, {
			"method": "strripos()",
			"doc": "http://php.net/manual/en/function.strripos.php",
			"title": "Finds the position of the last occurrence of a string inside another string "
		}, {
			"method": "strrpos()",
			"doc": "http://php.net/manual/en/function.strrpos.php",
			"title": "Finds the position of the last occurrence of a string inside another string "
		}, {
			"method": "strspn()",
			"doc": "http://php.net/manual/en/function.strspn.php",
			"title": "Returns the number of characters found in a string that contains only characters from a specified charlist"
		}, {
			"method": "strstr()",
			"doc": "http://php.net/manual/en/function.strstr.php",
			"title": "Finds the first occurrence of a string inside another string "
		}, {
			"method": "strtok()",
			"doc": "http://php.net/manual/en/function.strtok.php",
			"title": "Splits a string into smaller strings"
		}, {
			"method": "strtolower()",
			"doc": "http://php.net/manual/en/function.strtolower.php",
			"title": "Converts a string to lowercase letters"
		}, {
			"method": "strtoupper()",
			"doc": "http://php.net/manual/en/function.strtoupper.php",
			"title": "Converts a string to uppercase letters"
		}, {
			"method": "strtr()",
			"doc": "http://php.net/manual/en/function.strtr.php",
			"title": "Translates certain characters in a string"
		}, {
			"method": "substr()",
			"doc": "http://php.net/manual/en/function.substr.php",
			"title": "Returns a part of a string"
		}, {
			"method": "substr_compare()",
			"doc": "http://php.net/manual/en/function.substr-compare.php",
			"title": "Compares two strings from a specified start position "
		}, {
			"method": "substr_count()",
			"doc": "http://php.net/manual/en/function.substr-count.php",
			"title": "Counts the number of times a substring occurs in a string"
		}, {
			"method": "substr_replace()",
			"doc": "http://php.net/manual/en/function.substr-replace.php",
			"title": "Replaces a part of a string with another string"
		}, {
			"method": "trim()",
			"doc": "http://php.net/manual/en/function.trim.php",
			"title": "Strips whitespace from both sides of a string"
		}, {
			"method": "ucfirst()",
			"doc": "http://php.net/manual/en/function.ucfirst.php",
			"title": "Converts the first character of a string to uppercase"
		}, {
			"method": "ucwords()",
			"doc": "http://php.net/manual/en/function.ucwords.php",
			"title": "Converts the first character of each word in a string to uppercase"
		}, {
			"method": "vfprintf()",
			"doc": "http://php.net/manual/en/function.vfprintf.php",
			"title": "Writes a formatted string to a specified output stream"
		}, {
			"method": "vprintf()",
			"doc": "http://php.net/manual/en/function.vprintf.php",
			"title": "Outputs a formatted string"
		}, {
			"method": "vsprintf()",
			"doc": "http://php.net/manual/en/function.vsprintf.php",
			"title": "Writes a formatted string to a variable"
		}, {
			"method": "wordwrap()",
			"doc": "http://php.net/manual/en/function.wordwrap.php",
			"title": "Wraps a string to a given number of characters"
		}],
		arrays: [{
			"method": "array()",
			"doc": "http://php.net/manual/en/function.array.php",
			"title": "Creates an array"
		}, {
			"method": "array_change_key_case()",
			"doc": "http://php.net/manual/en/function.array-change-key-case.php",
			"title": "Returns an array with all keys in lowercase or uppercase"
		}, {
			"method": "array_chunk()",
			"doc": "http://php.net/manual/en/function.array-chunk.php",
			"title": "Splits an array into chunks of arrays"
		}, {
			"method": "array_combine()",
			"doc": "http://php.net/manual/en/function.array-combine.php",
			"title": "Creates an array by using one array for keys and another for its values"
		}, {
			"method": "array_count_values()",
			"doc": "http://php.net/manual/en/function.array-count-values.php",
			"title": "Returns an array with the number of occurrences for each value"
		}, {
			"method": "array_diff()",
			"doc": "http://php.net/manual/en/function.array-diff.php",
			"title": "Compares array values"
		}, {
			"method": "array_diff_assoc()",
			"doc": "http://php.net/manual/en/function.array-diff-assoc.php",
			"title": "Compares array keys and values"
		}, {
			"method": "array_diff_key()",
			"doc": "http://php.net/manual/en/function.array-diff-key.php",
			"title": "Compares array keys"
		}, {
			"method": "array_diff_uassoc()",
			"doc": "http://php.net/manual/en/function.array-diff-uassoc.php",
			"title": "Compares array keys and values"
		}, {
			"method": "array_diff_ukey()",
			"doc": "http://php.net/manual/en/function.array-diff-ukey.php",
			"title": "Compares array keys"
		}, {
			"method": "array_fill()",
			"doc": "http://php.net/manual/en/function.array-fill.php",
			"title": "Fills an array with values"
		}, {
			"method": "array_filter()",
			"doc": "http://php.net/manual/en/function.array-filter.php",
			"title": "Filters elements of an array using a user"
		}, {
			"method": "array_flip()",
			"doc": "http://php.net/manual/en/function.array-flip.php",
			"title": "Exchanges all keys with their associated values in an array"
		}, {
			"method": "array_intersect()",
			"doc": "http://php.net/manual/en/function.array-intersect.php",
			"title": "Compares array values"
		}, {
			"method": "array_intersect_assoc()",
			"doc": "http://php.net/manual/en/function.array-intersect-assoc.php",
			"title": "Compares array keys and values"
		}, {
			"method": "array_intersect_key()",
			"doc": "http://php.net/manual/en/function.array-intersect-key.php",
			"title": "Compares array keys"
		}, {
			"method": "array_intersect_uassoc()",
			"doc": "http://php.net/manual/en/function.array-intersect-uassoc.php",
			"title": "Compares array keys and values"
		}, {
			"method": "array_intersect_ukey()",
			"doc": "http://php.net/manual/en/function.array-intersect-ukey.php",
			"title": "Compares array keys"
		}, {
			"method": "array_key_exists()",
			"doc": "http://php.net/manual/en/function.array-key-exists.php",
			"title": "Checks if the specified key exists in the array"
		}, {
			"method": "array_keys()",
			"doc": "http://php.net/manual/en/function.array-keys.php",
			"title": "Returns all the keys of an array"
		}, {
			"method": "array_map()",
			"doc": "http://php.net/manual/en/function.array-map.php",
			"title": "Sends each value of an array to a user"
		}, {
			"method": "array_merge()",
			"doc": "http://php.net/manual/en/function.array-merge.php",
			"title": "Merges one or more arrays into one array"
		}, {
			"method": "array_merge_recursive()",
			"doc": "http://php.net/manual/en/function.array-merge-recursive.php",
			"title": "Merges one or more arrays into one array"
		}, {
			"method": "array_multisort()",
			"doc": "http://php.net/manual/en/function.array-multisort.php",
			"title": "Sorts multiple or multi"
		}, {
			"method": "array_pad()",
			"doc": "http://php.net/manual/en/function.array-pad.php",
			"title": "Inserts a specified number of items"
		}, {
			"method": "array_pop()",
			"doc": "http://php.net/manual/en/function.array-pop.php",
			"title": "Deletes the last element of an array"
		}, {
			"method": "array_product()",
			"doc": "http://php.net/manual/en/function.array-product.php",
			"title": "Calculates the product of the values in an array"
		}, {
			"method": "array_push()",
			"doc": "http://php.net/manual/en/function.array-push.php",
			"title": "Inserts one or more elements to the end of an array"
		}, {
			"method": "array_rand()",
			"doc": "http://php.net/manual/en/function.array-rand.php",
			"title": "Returns one or more random keys from an array"
		}, {
			"method": "array_reduce()",
			"doc": "http://php.net/manual/en/function.array-reduce.php",
			"title": "Returns an array as a string"
		}, {
			"method": "array_reverse()",
			"doc": "http://php.net/manual/en/function.array-reverse.php",
			"title": "Returns an array in the reverse order"
		}, {
			"method": "array_search()",
			"doc": "http://php.net/manual/en/function.array-search.php",
			"title": "Searches an array for a given value and returns the key"
		}, {
			"method": "array_shift()",
			"doc": "http://php.net/manual/en/function.array-shift.php",
			"title": "Removes the first element from an array"
		}, {
			"method": "array_slice()",
			"doc": "http://php.net/manual/en/function.array-slice.php",
			"title": "Returns selected parts of an array"
		}, {
			"method": "array_splice()",
			"doc": "http://php.net/manual/en/function.array-splice.php",
			"title": "Removes and replaces specified elements of an array"
		}, {
			"method": "array_sum()",
			"doc": "http://php.net/manual/en/function.array-sum.php",
			"title": "Returns the sum of the values in an array"
		}, {
			"method": "array_udiff()",
			"doc": "http://php.net/manual/en/function.array-udiff.php",
			"title": "Compares array values in a user"
		}, {
			"method": "array_udiff_assoc()",
			"doc": "http://php.net/manual/en/function.array-udiff-assoc.php",
			"title": "Compares array keys"
		}, {
			"method": "array_udiff_uassoc()",
			"doc": "http://php.net/manual/en/function.array-udiff-uassoc.php",
			"title": "Compares array keys and array values in user"
		}, {
			"method": "array_uintersect()",
			"doc": "http://php.net/manual/en/function.array-uintersect.php",
			"title": "Compares array values in a user"
		}, {
			"method": "array_uintersect_assoc()",
			"doc": "http://php.net/manual/en/function.array-uintersect-assoc.php",
			"title": "Compares array keys"
		}, {
			"method": "array_uintersect_uassoc()",
			"doc": "http://php.net/manual/en/function.array-uintersect-uassoc.php",
			"title": "Compares array keys and array values in user"
		}, {
			"method": "array_unique()",
			"doc": "http://php.net/manual/en/function.array-unique.php",
			"title": "Removes duplicate values from an array"
		}, {
			"method": "array_unshift()",
			"doc": "http://php.net/manual/en/function.array-unshift.php",
			"title": "Adds one or more elements to the beginning of an array"
		}, {
			"method": "array_values()",
			"doc": "http://php.net/manual/en/function.array-values.php",
			"title": "Returns all the values of an array"
		}, {
			"method": "array_walk()",
			"doc": "http://php.net/manual/en/function.array-walk.php",
			"title": "Applies a user function to every member of an array"
		}, {
			"method": "array_walk_recursive()",
			"doc": "http://php.net/manual/en/function.array-walk-recursive.php",
			"title": "Applies a user function recursively to every member of an array"
		}, {
			"method": "arsort()",
			"doc": "http://php.net/manual/en/function.arsort.php",
			"title": "Sorts an array in reverse order and maintain index association"
		}, {
			"method": "asort()",
			"doc": "http://php.net/manual/en/function.asort.php",
			"title": "Sorts an array and maintain index association"
		}, {
			"method": "compact()",
			"doc": "http://php.net/manual/en/function.compact.php",
			"title": "Create array containing variables and their values"
		}, {
			"method": "count()",
			"doc": "http://php.net/manual/en/function.count.php",
			"title": "Counts elements in an array"
		}, {
			"method": "current()",
			"doc": "http://php.net/manual/en/function.current.php",
			"title": "Returns the current element in an array"
		}, {
			"method": "each()",
			"doc": "http://php.net/manual/en/function.each.php",
			"title": "Returns the current key and value pair from an array"
		}, {
			"method": "end()",
			"doc": "http://php.net/manual/en/function.end.php",
			"title": "Sets the internal pointer of an array to its last element"
		}, {
			"method": "extract()",
			"doc": "http://php.net/manual/en/function.extract.php",
			"title": "Imports variables into the current symbol table from an array"
		}, {
			"method": "in_array()",
			"doc": "http://php.net/manual/en/function.in-array.php",
			"title": "Checks if a specified value exists in an array"
		}, {
			"method": "key()",
			"doc": "http://php.net/manual/en/function.key.php",
			"title": "Fetches a key from an array"
		}, {
			"method": "krsort()",
			"doc": "http://php.net/manual/en/function.krsort.php",
			"title": "Sorts an array by key in reverse order"
		}, {
			"method": "ksort()",
			"doc": "http://php.net/manual/en/function.ksort.php",
			"title": "Sorts an array by key"
		}, {
			"method": "list()",
			"doc": "http://php.net/manual/en/function.list.php",
			"title": "Assigns variables as if they were an array"
		}, {
			"method": "natcasesort()",
			"doc": "http://php.net/manual/en/function.natcasesort.php', title='Sorts an array using a case insensitive ",
			"title": "Sorts an array using a case insensitive "
		}, {
			"method": "natsort()",
			"doc": "http://php.net/manual/en/function.natsort.php', title='Sorts an array using a ",
			"title": "Sorts an array using a "
		}, {
			"method": "next()",
			"doc": "http://php.net/manual/en/function.next.php",
			"title": "Advance the internal array pointer of an array"
		}, {
			"method": "pos()",
			"doc": "http://php.net/manual/en/function.current.php",
			"title": "Alias of current"
		}, {
			"method": "prev()",
			"doc": "http://php.net/manual/en/function.prev.php",
			"title": "Rewinds the internal array pointer"
		}, {
			"method": "range()",
			"doc": "http://php.net/manual/en/function.range.php",
			"title": "Creates an array containing a range of elements"
		}, {
			"method": "reset()",
			"doc": "http://php.net/manual/en/function.reset.php",
			"title": "Sets the internal pointer of an array to its first element"
		}, {
			"method": "rsort()",
			"doc": "http://php.net/manual/en/function.rsort.php",
			"title": "Sorts an array in reverse order"
		}, {
			"method": "shuffle()",
			"doc": "http://php.net/manual/en/function.shuffle.php",
			"title": "Shuffles an array"
		}, {
			"method": "sizeof()",
			"doc": "http://php.net/manual/en/function.count.php",
			"title": "Alias of count"
		}, {
			"method": "sort()",
			"doc": "http://php.net/manual/en/function.sort.php",
			"title": "Sorts an array"
		}, {
			"method": "uasort()",
			"doc": "http://php.net/manual/en/function.uasort.php",
			"title": "Sorts an array with a user"
		}, {
			"method": "uksort()",
			"doc": "http://php.net/manual/en/function.uksort.php",
			"title": "Sorts an array by keys using a user"
		}, {
			"method": "usort()",
			"doc": "http://php.net/manual/en/function.usort.php",
			"title": "Sorts an array by values using a user"
		}]
	}
}