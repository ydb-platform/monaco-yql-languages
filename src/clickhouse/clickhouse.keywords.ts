import type {CompletionLists} from '../completion';

export const keywords = [
    'AND',
    'ANY',
    'AS',
    'ASC',
    'ATTACH',
    'BETWEEN',
    'CASE',
    'CAST',
    'CREATE',
    'CROSS',
    'DATABASE',
    'DATABASES',
    'DEFAULT',
    'DELETE',
    'DESC',
    'DESCRIBE',
    'DETACH',
    'DISTINCT',
    'DROP',
    'ELSE',
    'END',
    'FOREIGN',
    'FROM',
    'GRANT',
    'HAVING',
    'IF',
    'INNER',
    'INSERT',
    'JOIN',
    'KEY',
    'LEFT',
    'NATURAL',
    'NOT',
    'OFFSET',
    'ON',
    'OPTIMIZE',
    'OR',
    'OUTER',
    'PREWHERE',
    'PRIMARY',
    'PROCESSLIST',
    'REFERENCES',
    'RIGHT',
    'SELECT',
    'SHOW',
    'TABLE',
    'THEN',
    'TO',
    'TOTALS',
    'TYPE',
    'UNION',
    'UPDATE',
    'USE',
    'WHEN',
    'WHERE',
    'WITH',
];

export const keywordsDouble = [
    'GROUP BY',
    'ON CLUSTER',
    'ORDER BY',
    'LIMIT',
    'RENAME TABLE',
    'IF NOT EXISTS',
    'IF EXISTS',
    'FORMAT Vertical',
    'FORMAT JSONCompact',
    'FORMAT JSONEachRow',
    'FORMAT TSKV',
    'FORMAT TabSeparatedWithNames',
    'FORMAT TabSeparatedWithNamesAndTypes',
    'FORMAT TabSeparatedRaw',
    'FORMAT BlockTabSeparated',
    'FORMAT CSVWithNames',
    'FORMAT CSV',
    'FORMAT JSON',
    'FORMAT TabSeparated',
];

export const constants = ['true', 'false', 'NULL'];

export const functionsCaseSensitive = [
    '__bitBoolMaskAnd',
    '__bitBoolMaskOr',
    '__bitSwapLastTwo',
    '__bitWrapperFunc',
    '__getScalar',
    'accurate_Cast',
    'accurate_CastOrNull',
    'accurateCast',
    'accurateCastOrNull',
    'acosh',
    'addDays',
    'addHours',
    'addMinutes',
    'addMonths',
    'addQuarters',
    'addressToLine',
    'addressToSymbol',
    'addSeconds',
    'addWeeks',
    'addYears',
    'aes_decrypt_mysql',
    'aes_encrypt_mysql',
    'aggThrow',
    'alphaTokens',
    'and',
    'any',
    'anyHeavy',
    'anyLast',
    'appendTrailingCharIfAbsent',
    'argMax',
    'argMin',
    'array',
    'arrayAll',
    'arrayAUC',
    'arrayAvg',
    'arrayCompact',
    'arrayConcat',
    'arrayCount',
    'arrayCumSum',
    'arrayCumSumNonNegative',
    'arrayDifference',
    'arrayDistinct',
    'arrayElement',
    'arrayEnumerate',
    'arrayEnumerateDense',
    'arrayEnumerateDenseRanked',
    'arrayEnumerateUniq',
    'arrayEnumerateUniqRanked',
    'arrayExists',
    'arrayFill',
    'arrayFilter',
    'arrayFirst',
    'arrayFirstIndex',
    'arrayFlatten',
    'arrayIntersect',
    'arrayJoin',
    'arrayMap',
    'arrayMax',
    'arrayMin',
    'arrayPopBack',
    'arrayPopFront',
    'arrayProduct',
    'arrayPushBack',
    'arrayPushFront',
    'arrayReduce',
    'arrayReduceInRanges',
    'arrayResize',
    'arrayReverse',
    'arrayReverseFill',
    'arrayReverseSort',
    'arrayReverseSplit',
    'arraySlice',
    'arraySort',
    'arraySplit',
    'arrayStringConcat',
    'arraySum',
    'arrayUniq',
    'arrayWithConstant',
    'arrayZip',
    'asinh',
    'assumeNotNull',
    'atanh',
    'avgWeighted',
    'bar',
    'base64Decode',
    'base64Encode',
    'basename',
    'bitAnd',
    'bitCount',
    'bitHammingDistance',
    'bitmaskToArray',
    'bitmaskToList',
    'bitNot',
    'bitOr',
    'bitPositionsToArray',
    'bitRotateLeft',
    'bitRotateRight',
    'bitShiftLeft',
    'bitShiftRight',
    'bitTest',
    'bitTestAll',
    'bitTestAny',
    'bitXor',
    'blockNumber',
    'blockSerializedSize',
    'blockSize',
    'boundingRatio',
    'buildId',
    'byteSize',
    'caseWithExpr',
    'caseWithExpression',
    'caseWithoutExpr',
    'caseWithoutExpression',
    'categoricalInformationValue',
    'cbrt',
    'cityHash64',
    'concatAssumeInjective',
    'ConvertYson',
    'corrStable',
    'cosh',
    'countDigits',
    'countEqual',
    'countMatches',
    'countMatchesCaseInsensitive',
    'countSubstringsCaseInsensitive',
    'countSubstringsCaseInsensitiveUTF8',
    'covarPop',
    'covarPopStable',
    'covarSamp',
    'covarSampStable',
    'currentDatabase',
    'currentProfiles',
    'currentRoles',
    'currentUser',
    'cutFragment',
    'cutIPv6',
    'cutQueryString',
    'cutQueryStringAndFragment',
    'cutToFirstSignificantSubdomain',
    'cutToFirstSignificantSubdomainCustom',
    'cutToFirstSignificantSubdomainCustomWithWWW',
    'cutToFirstSignificantSubdomainWithWWW',
    'cutURLParameter',
    'cutWWW',
    'dateTime64ToSnowflake',
    'dateTimeToSnowflake',
    'dateTrunc',
    'decodeURLComponent',
    'decodeXMLComponent',
    'decrypt',
    'defaultProfiles',
    'defaultRoles',
    'defaultValueOfArgumentType',
    'defaultValueOfTypeName',
    'deltaSum',
    'deltaSumTimestamp',
    'demangle',
    'dictGet',
    'dictGetChildren',
    'dictGetDate',
    'dictGetDateOrDefault',
    'dictGetDateTime',
    'dictGetDateTimeOrDefault',
    'dictGetDescendants',
    'dictGetFloat32',
    'dictGetFloat32OrDefault',
    'dictGetFloat64',
    'dictGetFloat64OrDefault',
    'dictGetHierarchy',
    'dictGetInt8',
    'dictGetInt8OrDefault',
    'dictGetInt16',
    'dictGetInt16OrDefault',
    'dictGetInt32',
    'dictGetInt32OrDefault',
    'dictGetInt64',
    'dictGetInt64OrDefault',
    'dictGetOrDefault',
    'dictGetOrNull',
    'dictGetString',
    'dictGetStringOrDefault',
    'dictGetUInt8',
    'dictGetUInt8OrDefault',
    'dictGetUInt16',
    'dictGetUInt16OrDefault',
    'dictGetUInt32',
    'dictGetUInt32OrDefault',
    'dictGetUInt64',
    'dictGetUInt64OrDefault',
    'dictGetUUID',
    'dictGetUUIDOrDefault',
    'dictHas',
    'dictIsIn',
    'divide',
    'domain',
    'domainWithoutWWW',
    'dumpColumnStructure',
    'e',
    'empty',
    'emptyArrayDate',
    'emptyArrayDateTime',
    'emptyArrayFloat32',
    'emptyArrayFloat64',
    'emptyArrayInt8',
    'emptyArrayInt16',
    'emptyArrayInt32',
    'emptyArrayInt64',
    'emptyArrayString',
    'emptyArrayToSingle',
    'emptyArrayUInt8',
    'emptyArrayUInt16',
    'emptyArrayUInt32',
    'emptyArrayUInt64',
    'enabledProfiles',
    'enabledRoles',
    'encodeXMLComponent',
    'encrypt',
    'endsWith',
    'entropy',
    'equals',
    'erf',
    'erfc',
    'errorCodeToName',
    'evalMLMethod',
    'exp2',
    'exp10',
    'extract',
    'extractAll',
    'extractAllGroups',
    'extractAllGroupsHorizontal',
    'extractAllGroupsVertical',
    'extractGroups',
    'extractTextFromHTML',
    'extractURLParameter',
    'extractURLParameterNames',
    'extractURLParameters',
    'farmFingerprint64',
    'farmHash64',
    'file',
    'filesystemAvailable',
    'filesystemCapacity',
    'filesystemFree',
    'finalizeAggregation',
    'firstSignificantSubdomain',
    'firstSignificantSubdomainCustom',
    'format',
    'formatDateTime',
    'formatReadableQuantity',
    'formatReadableSize',
    'formatReadableTimeDelta',
    'formatRow',
    'formatRowNoNewline',
    'fragment',
    'FROM_UNIXTIME',
    'fromModifiedJulianDay',
    'fromModifiedJulianDayOrNull',
    'fromUnixTimestamp',
    'fromUnixTimestamp64Micro',
    'fromUnixTimestamp64Milli',
    'fromUnixTimestamp64Nano',
    'fullHostName',
    'fuzzBits',
    'gcd',
    'generateUUIDv4',
    'geoDistance',
    'geohashDecode',
    'geohashEncode',
    'geohashesInBox',
    'geoToH3',
    'getMacro',
    'getServerPort',
    'getSetting',
    'getSizeOfEnumType',
    'globalIn',
    'globalInIgnoreSet',
    'globalNotIn',
    'globalNotInIgnoreSet',
    'globalNotNullIn',
    'globalNotNullInIgnoreSet',
    'globalNullIn',
    'globalNullInIgnoreSet',
    'globalVariable',
    'greatCircleAngle',
    'greatCircleDistance',
    'greater',
    'greaterOrEquals',
    'groupArray',
    'groupArrayInsertAt',
    'groupArrayMovingAvg',
    'groupArrayMovingSum',
    'groupArraySample',
    'groupBitAnd',
    'groupBitOr',
    'groupBitXor',
    'groupUniqArray',
    'h3EdgeAngle',
    'h3EdgeLengthM',
    'h3GetBaseCell',
    'h3GetResolution',
    'h3HexAreaM2',
    'h3IndexesAreNeighbors',
    'h3IsValid',
    'h3kRing',
    'h3ToChildren',
    'h3ToGeo',
    'h3ToParent',
    'h3ToString',
    'halfMD5',
    'has',
    'hasAll',
    'hasAny',
    'hasColumnInTable',
    'hasSubstr',
    'hasThreadFuzzer',
    'hasToken',
    'hasTokenCaseInsensitive',
    'histogram',
    'hiveHash',
    'hostName',
    'hostname',
    'identity',
    'ifNotFinite',
    'ignore',
    'ilike',
    'in',
    'indexHint',
    'indexOf',
    'inIgnoreSet',
    'initializeAggregation',
    'initialQueryID',
    'intDiv',
    'intDivOrZero',
    'intervalLengthSum',
    'intExp2',
    'intExp10',
    'intHash32',
    'intHash64',
    'IPv4CIDRToRange',
    'IPv4NumToString',
    'IPv4NumToStringClassC',
    'IPv4StringToNum',
    'IPv4ToIPv6',
    'IPv6CIDRToRange',
    'IPv6NumToString',
    'IPv6StringToNum',
    'isConstant',
    'isDecimalOverflow',
    'isFinite',
    'isInfinite',
    'isIPAddressInRange',
    'isIPv4String',
    'isIPv6String',
    'isNaN',
    'isNotNull',
    'isValidJSON',
    'isValidUTF8',
    'isZeroOrNull',
    'javaHash',
    'javaHashUTF16LE',
    'joinGet',
    'joinGetOrNull',
    'JSON_EXISTS',
    'JSON_QUERY',
    'JSON_VALUE',
    'JSONExtract',
    'JSONExtractArrayRaw',
    'JSONExtractBool',
    'JSONExtractFloat',
    'JSONExtractInt',
    'JSONExtractKeysAndValues',
    'JSONExtractKeysAndValuesRaw',
    'JSONExtractRaw',
    'JSONExtractString',
    'JSONExtractUInt',
    'JSONHas',
    'JSONKey',
    'JSONLength',
    'JSONType',
    'jumpConsistentHash',
    'kurtPop',
    'kurtSamp',
    'lagInFrame',
    'lcm',
    'leadInFrame',
    'leftPad',
    'leftPadUTF8',
    'lengthUTF8',
    'less',
    'lessOrEquals',
    'lgamma',
    'like',
    'log1p',
    'logTrace',
    'lowCardinalityIndices',
    'lowCardinalityKeys',
    'lowerUTF8',
    'MACNumToString',
    'MACStringToNum',
    'MACStringToOUI',
    'mannWhitneyUTest',
    'map',
    'mapAdd',
    'mapContains',
    'mapKeys',
    'mapPopulateSeries',
    'mapSubtract',
    'mapValues',
    'match',
    'materialize',
    'maxIntersections',
    'maxIntersectionsPosition',
    'maxMap',
    'MD5',
    'median',
    'medianBFloat16',
    'medianBFloat16Weighted',
    'medianDeterministic',
    'medianExact',
    'medianExactHigh',
    'medianExactLow',
    'medianExactWeighted',
    'medianTDigest',
    'medianTDigestWeighted',
    'medianTiming',
    'medianTimingWeighted',
    'metroHash64',
    'minMap',
    'minus',
    'modelEvaluate',
    'modulo',
    'moduloLegacy',
    'moduloOrZero',
    'multiFuzzyMatchAllIndices',
    'multiFuzzyMatchAny',
    'multiFuzzyMatchAnyIndex',
    'multiIf',
    'multiMatchAllIndices',
    'multiMatchAny',
    'multiMatchAnyIndex',
    'multiply',
    'multiSearchAllPositions',
    'multiSearchAllPositionsCaseInsensitive',
    'multiSearchAllPositionsCaseInsensitiveUTF8',
    'multiSearchAllPositionsUTF8',
    'multiSearchAny',
    'multiSearchAnyCaseInsensitive',
    'multiSearchAnyCaseInsensitiveUTF8',
    'multiSearchAnyUTF8',
    'multiSearchFirstIndex',
    'multiSearchFirstIndexCaseInsensitive',
    'multiSearchFirstIndexCaseInsensitiveUTF8',
    'multiSearchFirstIndexUTF8',
    'multiSearchFirstPosition',
    'multiSearchFirstPositionCaseInsensitive',
    'multiSearchFirstPositionCaseInsensitiveUTF8',
    'multiSearchFirstPositionUTF8',
    'negate',
    'neighbor',
    'netloc',
    'ngramDistance',
    'ngramDistanceCaseInsensitive',
    'ngramDistanceCaseInsensitiveUTF8',
    'ngramDistanceUTF8',
    'ngramMinHash',
    'ngramMinHashArg',
    'ngramMinHashArgCaseInsensitive',
    'ngramMinHashArgCaseInsensitiveUTF8',
    'ngramMinHashArgUTF8',
    'ngramMinHashCaseInsensitive',
    'ngramMinHashCaseInsensitiveUTF8',
    'ngramMinHashUTF8',
    'ngramSearch',
    'ngramSearchCaseInsensitive',
    'ngramSearchCaseInsensitiveUTF8',
    'ngramSearchUTF8',
    'ngramSimHash',
    'ngramSimHashCaseInsensitive',
    'ngramSimHashCaseInsensitiveUTF8',
    'ngramSimHashUTF8',
    'normalizedQueryHash',
    'normalizedQueryHashKeepNames',
    'normalizeQuery',
    'normalizeQueryKeepNames',
    'notEmpty',
    'notEquals',
    'notILike',
    'notIn',
    'notInIgnoreSet',
    'notLike',
    'notNullIn',
    'notNullInIgnoreSet',
    'nullIn',
    'nullInIgnoreSet',
    'or',
    'parseDateTime32BestEffort',
    'parseDateTime32BestEffortOrNull',
    'parseDateTime32BestEffortOrZero',
    'parseDateTime64BestEffort',
    'parseDateTime64BestEffortOrNull',
    'parseDateTime64BestEffortOrZero',
    'parseDateTimeBestEffort',
    'parseDateTimeBestEffortOrNull',
    'parseDateTimeBestEffortOrZero',
    'parseDateTimeBestEffortUS',
    'parseDateTimeBestEffortUSOrNull',
    'parseDateTimeBestEffortUSOrZero',
    'partitionId',
    'path',
    'pathFull',
    'plus',
    'pointInEllipses',
    'pointInPolygon',
    'polygonAreaCartesian',
    'polygonAreaSpherical',
    'polygonConvexHullCartesian',
    'polygonPerimeterCartesian',
    'polygonPerimeterSpherical',
    'polygonsDistanceCartesian',
    'polygonsDistanceSpherical',
    'polygonsEqualsCartesian',
    'polygonsIntersectionCartesian',
    'polygonsIntersectionSpherical',
    'polygonsSymDifferenceCartesian',
    'polygonsSymDifferenceSpherical',
    'polygonsUnionCartesian',
    'polygonsUnionSpherical',
    'polygonsWithinCartesian',
    'polygonsWithinSpherical',
    'port',
    'positionCaseInsensitive',
    'positionCaseInsensitiveUTF8',
    'positionUTF8',
    'protocol',
    'quantile',
    'quantileBFloat16',
    'quantileBFloat16Weighted',
    'quantileDeterministic',
    'quantileExact',
    'quantileExactExclusive',
    'quantileExactHigh',
    'quantileExactInclusive',
    'quantileExactLow',
    'quantileExactWeighted',
    'quantiles',
    'quantilesBFloat16',
    'quantilesBFloat16Weighted',
    'quantilesDeterministic',
    'quantilesExact',
    'quantilesExactExclusive',
    'quantilesExactHigh',
    'quantilesExactInclusive',
    'quantilesExactLow',
    'quantilesExactWeighted',
    'quantilesTDigest',
    'quantilesTDigestWeighted',
    'quantilesTiming',
    'quantilesTimingWeighted',
    'quantileTDigest',
    'quantileTDigestWeighted',
    'quantileTiming',
    'quantileTimingWeighted',
    'queryID',
    'queryString',
    'queryStringAndFragment',
    'rand32',
    'rand64',
    'randConstant',
    'randomFixedString',
    'randomPrintableASCII',
    'randomString',
    'randomStringUTF8',
    'range',
    'rankCorr',
    'readWktMultiPolygon',
    'readWktPoint',
    'readWktPolygon',
    'readWktRing',
    'regexpQuoteMeta',
    'regionHierarchy',
    'regionIn',
    'regionToArea',
    'regionToCity',
    'regionToContinent',
    'regionToCountry',
    'regionToDistrict',
    'regionToName',
    'regionToPopulation',
    'regionToTopContinent',
    'reinterpret',
    'reinterpretAsDate',
    'reinterpretAsDateTime',
    'reinterpretAsFixedString',
    'reinterpretAsFloat32',
    'reinterpretAsFloat64',
    'reinterpretAsInt8',
    'reinterpretAsInt16',
    'reinterpretAsInt32',
    'reinterpretAsInt64',
    'reinterpretAsInt128',
    'reinterpretAsInt256',
    'reinterpretAsString',
    'reinterpretAsUInt8',
    'reinterpretAsUInt16',
    'reinterpretAsUInt32',
    'reinterpretAsUInt64',
    'reinterpretAsUInt128',
    'reinterpretAsUInt256',
    'reinterpretAsUUID',
    'replaceAll',
    'replaceOne',
    'replaceRegexpAll',
    'replaceRegexpOne',
    'replicate',
    'retention',
    'reverseUTF8',
    'rightPad',
    'rightPadUTF8',
    'roundAge',
    'roundBankers',
    'roundDown',
    'roundDuration',
    'roundToExp2',
    'rowNumberInAllBlocks',
    'rowNumberInBlock',
    'runningAccumulate',
    'runningConcurrency',
    'runningDifference',
    'runningDifferenceStartingWithFirstValue',
    'sequenceCount',
    'sequenceMatch',
    'sequenceNextNode',
    'serverUUID',
    'SHA1',
    'SHA224',
    'SHA256',
    'SHA512',
    'shardCount',
    'shardNum',
    'sigmoid',
    'simpleJSONExtractBool',
    'simpleJSONExtractFloat',
    'simpleJSONExtractInt',
    'simpleJSONExtractRaw',
    'simpleJSONExtractString',
    'simpleJSONExtractUInt',
    'simpleJSONHas',
    'simpleLinearRegression',
    'singleValueOrNull',
    'sinh',
    'sipHash64',
    'sipHash128',
    'skewPop',
    'skewSamp',
    'sleep',
    'sleepEachRow',
    'snowflakeToDateTime',
    'snowflakeToDateTime64',
    'splitByChar',
    'splitByNonAlpha',
    'splitByRegexp',
    'splitByString',
    'splitByWhitespace',
    'startsWith',
    'stddevPop',
    'stddevPopStable',
    'stddevSamp',
    'stddevSampStable',
    'stochasticLinearRegression',
    'stochasticLogisticRegression',
    'stringToH3',
    'studentTTest',
    'substringUTF8',
    'subtractDays',
    'subtractHours',
    'subtractMinutes',
    'subtractMonths',
    'subtractQuarters',
    'subtractSeconds',
    'subtractWeeks',
    'subtractYears',
    'sumCount',
    'sumKahan',
    'sumMap',
    'sumMapFiltered',
    'sumMapFilteredWithOverflow',
    'sumMapWithOverflow',
    'sumWithOverflow',
    'svg',
    'tcpPort',
    'tgamma',
    'throwIf',
    'tid',
    'timeSlot',
    'timeSlots',
    'timeZone',
    'timezone',
    'timeZoneOf',
    'timezoneOf',
    'timeZoneOffset',
    'timezoneOffset',
    'toColumnTypeName',
    'toDate',
    'toDate32',
    'toDate32OrNull',
    'toDate32OrZero',
    'toDateOrNull',
    'toDateOrZero',
    'toDateTime',
    'toDateTime32',
    'toDateTime64',
    'toDateTime64OrNull',
    'toDateTime64OrZero',
    'toDateTimeOrNull',
    'toDateTimeOrZero',
    'today',
    'toDayOfMonth',
    'toDayOfWeek',
    'toDayOfYear',
    'toDecimal32',
    'toDecimal32OrNull',
    'toDecimal32OrZero',
    'toDecimal64',
    'toDecimal64OrNull',
    'toDecimal64OrZero',
    'toDecimal128',
    'toDecimal128OrNull',
    'toDecimal128OrZero',
    'toDecimal256',
    'toDecimal256OrNull',
    'toDecimal256OrZero',
    'toFixedString',
    'toFloat32',
    'toFloat32OrNull',
    'toFloat32OrZero',
    'toFloat64',
    'toFloat64OrNull',
    'toFloat64OrZero',
    'toHour',
    'toInt8',
    'toInt8OrNull',
    'toInt8OrZero',
    'toInt16',
    'toInt16OrNull',
    'toInt16OrZero',
    'toInt32',
    'toInt32OrNull',
    'toInt32OrZero',
    'toInt64',
    'toInt64OrNull',
    'toInt64OrZero',
    'toInt128',
    'toInt128OrNull',
    'toInt128OrZero',
    'toInt256',
    'toInt256OrNull',
    'toInt256OrZero',
    'toIntervalDay',
    'toIntervalHour',
    'toIntervalMinute',
    'toIntervalMonth',
    'toIntervalQuarter',
    'toIntervalSecond',
    'toIntervalWeek',
    'toIntervalYear',
    'toIPv4',
    'toIPv6',
    'toISOWeek',
    'toISOYear',
    'toJSONString',
    'toLowCardinality',
    'toMinute',
    'toModifiedJulianDay',
    'toModifiedJulianDayOrNull',
    'toMonday',
    'toMonth',
    'toNullable',
    'topK',
    'topKWeighted',
    'topLevelDomain',
    'toQuarter',
    'toRelativeDayNum',
    'toRelativeHourNum',
    'toRelativeMinuteNum',
    'toRelativeMonthNum',
    'toRelativeQuarterNum',
    'toRelativeSecondNum',
    'toRelativeWeekNum',
    'toRelativeYearNum',
    'toSecond',
    'toStartOfDay',
    'toStartOfFifteenMinutes',
    'toStartOfFiveMinute',
    'toStartOfHour',
    'toStartOfInterval',
    'toStartOfISOYear',
    'toStartOfMinute',
    'toStartOfMonth',
    'toStartOfQuarter',
    'toStartOfSecond',
    'toStartOfTenMinutes',
    'toStartOfWeek',
    'toStartOfYear',
    'toString',
    'toStringCutToZero',
    'toTime',
    'toTimeZone',
    'toTimezone',
    'toTypeName',
    'toUInt8',
    'toUInt8OrNull',
    'toUInt8OrZero',
    'toUInt16',
    'toUInt16OrNull',
    'toUInt16OrZero',
    'toUInt32',
    'toUInt32OrNull',
    'toUInt32OrZero',
    'toUInt64',
    'toUInt64OrNull',
    'toUInt64OrZero',
    'toUInt128',
    'toUInt128OrNull',
    'toUInt128OrZero',
    'toUInt256',
    'toUInt256OrNull',
    'toUInt256OrZero',
    'toUnixTimestamp',
    'toUnixTimestamp64Micro',
    'toUnixTimestamp64Milli',
    'toUnixTimestamp64Nano',
    'toUUID',
    'toUUIDOrNull',
    'toUUIDOrZero',
    'toValidUTF8',
    'toWeek',
    'toYear',
    'toYearWeek',
    'toYYYYMM',
    'toYYYYMMDD',
    'toYYYYMMDDhhmmss',
    'transform',
    'trimBoth',
    'trimLeft',
    'trimRight',
    'tryBase64Decode',
    'tuple',
    'tupleElement',
    'tupleHammingDistance',
    'tupleToNameValuePairs',
    'uniq',
    'uniqCombined',
    'uniqCombined64',
    'uniqExact',
    'uniqHLL12',
    'uniqUpTo',
    'upperUTF8',
    'uptime',
    'URLHash',
    'URLHierarchy',
    'URLPathHierarchy',
    'UUIDNumToString',
    'UUIDStringToNum',
    'validateNestedArraySizes',
    'varPop',
    'varPopStable',
    'varSamp',
    'varSampStable',
    'visibleWidth',
    'visitParamExtractBool',
    'visitParamExtractFloat',
    'visitParamExtractInt',
    'visitParamExtractRaw',
    'visitParamExtractString',
    'visitParamExtractUInt',
    'visitParamHas',
    'welchTTest',
    'windowFunnel',
    'wkt',
    'wordShingleMinHash',
    'wordShingleMinHashArg',
    'wordShingleMinHashArgCaseInsensitive',
    'wordShingleMinHashArgCaseInsensitiveUTF8',
    'wordShingleMinHashArgUTF8',
    'wordShingleMinHashCaseInsensitive',
    'wordShingleMinHashCaseInsensitiveUTF8',
    'wordShingleMinHashUTF8',
    'wordShingleSimHash',
    'wordShingleSimHashCaseInsensitive',
    'wordShingleSimHashCaseInsensitiveUTF8',
    'wordShingleSimHashUTF8',
    'xor',
    'xxHash32',
    'xxHash64',
    'yandexConsistentHash',
    'yesterday',
    'YPathArrayBoolean',
    'YPathArrayBooleanStrict',
    'YPathArrayDouble',
    'YPathArrayDoubleStrict',
    'YPathArrayInt64',
    'YPathArrayInt64Strict',
    'YPathArrayUInt64',
    'YPathArrayUInt64Strict',
    'YPathBoolean',
    'YPathBooleanStrict',
    'YPathDouble',
    'YPathDoubleStrict',
    'YPathExtract',
    'YPathExtractStrict',
    'YPathInt64',
    'YPathInt64Strict',
    'YPathRaw',
    'YPathRawStrict',
    'YPathString',
    'YPathStringStrict',
    'YPathUInt64',
    'YPathUInt64Strict',
    'YSONExtract',
    'YSONExtractArrayRaw',
    'YSONExtractBool',
    'YSONExtractFloat',
    'YSONExtractInt',
    'YSONExtractKeysAndValues',
    'YSONExtractKeysAndValuesRaw',
    'YSONExtractRaw',
    'YSONExtractString',
    'YSONExtractUInt',
    'YSONHas',
    'YSONKey',
    'YSONLength',
    'YSONType',
];

export const functionsCaseInsensitive = [
    '_CAST',
    'abs',
    'acos',
    'asin',
    'atan',
    'atan2',
    'avg',
    'bin',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'CAST',
    'ceil',
    'ceiling',
    'char',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'coalesce',
    'concat',
    'connection_id',
    'connectionId',
    'corr',
    'cos',
    'count',
    'countSubstrings',
    'COVAR_POP',
    'COVAR_SAMP',
    'CRC32',
    'CRC32IEEE',
    'CRC64',
    'DATABASE',
    'DATE',
    'date_trunc',
    'dateDiff',
    'dateName',
    'DAY',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'dense_rank',
    'exp',
    'first_value',
    'flatten',
    'floor',
    'FQDN',
    'FROM_BASE64',
    'greatest',
    'hex',
    'HOUR',
    'hypot',
    'if',
    'ifNull',
    'INET6_ATON',
    'INET6_NTOA',
    'INET_ATON',
    'INET_NTOA',
    'initial_query_id',
    'isNull',
    'last_value',
    'lcase',
    'least',
    'length',
    'ln',
    'locate',
    'log',
    'log2',
    'log10',
    'lower',
    'lpad',
    'max',
    'mid',
    'min',
    'MINUTE',
    'mod',
    'MONTH',
    'not',
    'now',
    'now64',
    'nth_value',
    'nullIf',
    'pi',
    'position',
    'pow',
    'power',
    'QUARTER',
    'query_id',
    'rand',
    'rank',
    'repeat',
    'replace',
    'reverse',
    'round',
    'row_number',
    'rpad',
    'SECOND',
    'sign',
    'sin',
    'sqrt',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'substr',
    'substring',
    'sum',
    'tan',
    'tanh',
    'TO_BASE64',
    'trunc',
    'truncate',
    'ucase',
    'unbin',
    'unhex',
    'upper',
    'user',
    'VAR_POP',
    'VAR_SAMP',
    'version',
    'week',
    'YEAR',
    'yearweek',
];

export const tableFunctions = [
    'cluster',
    'clusterAllReplicas',
    'concatYtTables',
    'concatYtTablesLike',
    'concatYtTablesRange',
    'concatYtTablesRegexp',
    'dictionary',
    'executable',
    'file',
    'generateRandom',
    'input',
    'jdbc',
    'merge',
    'null',
    'numbers',
    'numbers_mt',
    'odbc',
    'remote',
    'remoteSecure',
    'url',
    'values',
    'view',
    'ytSubquery',
    'zeros',
    'zeros_mt',
];

export const tableEngines = ['Buffer', 'Memory', 'YtTable'];

export const dataTypeFamiliesCaseSensitive = [
    'AggregateFunction',
    'Array',
    'Enum8',
    'Enum16',
    'FixedString',
    'Float32',
    'Float64',
    'Int8',
    'Int16',
    'Int32',
    'Int64',
    'Int128',
    'Int256',
    'IntervalDay',
    'IntervalHour',
    'IntervalMinute',
    'IntervalMonth',
    'IntervalQuarter',
    'IntervalSecond',
    'IntervalWeek',
    'IntervalYear',
    'IPv4',
    'IPv6',
    'LowCardinality',
    'Map',
    'MultiPolygon',
    'Nested',
    'Nothing',
    'Nullable',
    'Point',
    'Polygon',
    'Ring',
    'SimpleAggregateFunction',
    'String',
    'Tuple',
    'UInt8',
    'UInt16',
    'UInt32',
    'UInt64',
    'UInt128',
    'UInt256',
    'UUID',
    'YtBoolean',
];

export const dataTypeFamiliesCaseInsensitive = [
    'BIGINT',
    'BIGINT SIGNED',
    'BIGINT UNSIGNED',
    'BINARY',
    'BINARY LARGE OBJECT',
    'BINARY VARYING',
    'BLOB',
    'BOOL',
    'BOOLEAN',
    'BYTE',
    'BYTEA',
    'CHAR',
    'CHAR LARGE OBJECT',
    'CHAR VARYING',
    'CHARACTER',
    'CHARACTER LARGE OBJECT',
    'CHARACTER VARYING',
    'CLOB',
    'DEC',
    'DOUBLE',
    'DOUBLE PRECISION',
    'Date',
    'Date32',
    'DateTime',
    'DateTime32',
    'DateTime64',
    'Decimal',
    'Decimal128',
    'Decimal256',
    'Decimal32',
    'Decimal64',
    'ENUM',
    'Enum',
    'FIXED',
    'FLOAT',
    'INET4',
    'INET6',
    'INT',
    'INT SIGNED',
    'INT UNSIGNED',
    'INT1',
    'INT1 SIGNED',
    'INT1 UNSIGNED',
    'INTEGER',
    'INTEGER SIGNED',
    'INTEGER UNSIGNED',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMINT SIGNED',
    'MEDIUMINT UNSIGNED',
    'MEDIUMTEXT',
    'NATIONAL CHAR',
    'NATIONAL CHAR VARYING',
    'NATIONAL CHARACTER',
    'NATIONAL CHARACTER LARGE OBJECT',
    'NATIONAL CHARACTER VARYING',
    'NCHAR',
    'NCHAR LARGE OBJECT',
    'NCHAR VARYING',
    'NUMERIC',
    'NVARCHAR',
    'REAL',
    'SINGLE',
    'SMALLINT',
    'SMALLINT SIGNED',
    'SMALLINT UNSIGNED',
    'TEXT',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYINT SIGNED',
    'TINYINT UNSIGNED',
    'TINYTEXT',
    'VARCHAR',
    'VARCHAR2',
];

export const completionLists: CompletionLists = {
    keywordList: keywords.concat(keywordsDouble),
    constantList: constants,
    typeParameterList: dataTypeFamiliesCaseSensitive.concat(
        dataTypeFamiliesCaseInsensitive,
        tableEngines,
    ),
    functionList: functionsCaseSensitive.concat(functionsCaseInsensitive, tableFunctions),
};
