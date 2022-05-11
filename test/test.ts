

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiLike from 'chai-like'

import parseSchemas from './../src/xsd';
import { downloadXsd } from './../src/download-schema';
import { generateTypes } from './../src/type-generator';
import path, { parse } from 'path';
import fetch from 'node-fetch';
import fs from 'fs'
import { Parser } from './../src/parser';



chai.use(chaiLike);

const expected = {
    "Daten": {
        "GenerierungsDaten": {
            "GenerierungsPunkte": 120,
            "MinimumVerbreitung": 3
        },
        "Organismen": {
            "Gattung": [
                {
                    "Name": {
                        "Lokalisirung": [
                            "Homo"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Die Gattung der Menschen"
                        ]
                    },
                    "Id": "Homo"
                }
            ],
            "Organismus": [
                {
                    "Morphe": {
                        "Morph": [
                            {
                                "Name": {
                                    "Lokalisirung": [
                                        "Mann"
                                    ]
                                },
                                "Beschreibung": {
                                    "Lokalisirung": [
                                        ""
                                    ]
                                },
                                "Eigenschaften": {
                                    "Mut": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Glück": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Klugheit": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Intuition": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Gewandtheit": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Feinmotorik": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Sympathie": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Antipathie": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Stärke": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Konstitution": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Punkte": 15
                                },
                                "StandardPfade": {
                                    "Pfad": [
                                        {
                                            "Id": "Alan"
                                        }
                                    ]
                                },
                                "Lebensabschnitte": {
                                    "Lebensabschnitt": [
                                        {
                                            "Spielbar": {
                                                "PfadPunkte": [
                                                    {
                                                        "Pfade": "Kultur",
                                                        "Punkte": 223
                                                    }
                                                ],
                                                "Kosten": 3
                                            },
                                            "Name": {
                                                "Lokalisirung": [
                                                    "Jugendlicher"
                                                ]
                                            },
                                            "Beschreibung": {
                                                "Lokalisirung": [
                                                    ""
                                                ]
                                            },
                                            "startAlter": 12,
                                            "endAlter": 13,
                                            "minGröße": 1.41,
                                            "minBMI": 15,
                                            "maxGröße": 1.56,
                                            "maxBMI": 21,
                                            "Id": "JugendlicherM1"
                                        }
                                    ]
                                },
                                "Geschlecht": "Mänlich",
                                "Id": "Mann"
                            },
                            {
                                "Name": {
                                    "Lokalisirung": [
                                        "Frau"
                                    ]
                                },
                                "Beschreibung": {
                                    "Lokalisirung": [
                                        ""
                                    ]
                                },
                                "Eigenschaften": {
                                    "Mut": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Glück": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Klugheit": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Intuition": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Gewandtheit": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Feinmotorik": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Sympathie": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Antipathie": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Stärke": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Konstitution": {
                                        "Durchschnitt": 1,
                                        "Minimum": 7,
                                        "Maximum": 13
                                    },
                                    "Punkte": 15
                                },
                                "StandardPfade": {
                                    "Pfad": [
                                        {
                                            "Id": "Kirin"
                                        }
                                    ]
                                },
                                "Lebensabschnitte": {
                                    "Lebensabschnitt": [
                                        {
                                            "Spielbar": {
                                                "PfadPunkte": [
                                                    {
                                                        "Pfade": "Kultur",
                                                        "Punkte": 223
                                                    }
                                                ],
                                                "Kosten": 3
                                            },
                                            "Name": {
                                                "Lokalisirung": [
                                                    "Jugendlicher"
                                                ]
                                            },
                                            "Beschreibung": {
                                                "Lokalisirung": [
                                                    ""
                                                ]
                                            },
                                            "startAlter": 0,
                                            "endAlter": 3,
                                            "minGröße": 1.44,
                                            "minBMI": 16,
                                            "maxGröße": 1.58,
                                            "maxBMI": 21,
                                            "Id": "JugendlicherW1"
                                        }
                                    ]
                                },
                                "Geschlecht": "Weiblich",
                                "Id": "Frau"
                            }
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Mensch"
                        ]
                    },
                    "Art": {
                        "Lokalisirung": [
                            "Sapiens"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Id": "Mensch",
                    "Gattung": "Homo"
                }
            ]
        },
        "PfadGruppen": {
            "Pfade": [
                {
                    "Name": {
                        "Lokalisirung": [
                            "Kultur"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Wähle die Kultur des Charakters"
                        ]
                    },
                    "Pfad": [
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Alan"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    ""
                                ]
                            },
                            "NächstePfade": {
                                "Pfad": [
                                    {
                                        "Id": "Koch"
                                    }
                                ]
                            },
                            "Levels": {
                                "Level": [
                                    {
                                        "PfadKosten": "0",
                                        "WiederhoteNutzung": "1",
                                        "Id": "T",
                                        "Kosten": "0"
                                    }
                                ]
                            },
                            "Id": "Alan"
                        },
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Kirin"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    ""
                                ]
                            },
                            "NächstePfade": {
                                "Pfad": [
                                    {
                                        "Id": "Soldat"
                                    }
                                ]
                            },
                            "Levels": {
                                "Level": [
                                    {
                                        "PfadKosten": "0",
                                        "WiederhoteNutzung": "1",
                                        "Id": "T",
                                        "Kosten": "0"
                                    }
                                ]
                            },
                            "Id": "Kirin"
                        }
                    ],
                    "WiderholungMinimum": "1",
                    "WiderholungMaximum": 2,
                    "Id": "Kultur"
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Proffession"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Wähle die Proffession"
                        ]
                    },
                    "Pfad": [
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Koch"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    ""
                                ]
                            },
                            "Levels": {
                                "Level": [
                                    {
                                        "Talent": [
                                            {
                                                "LevelTyp": "Effektiv",
                                                "Level": 3,
                                                "Id": "Kochen"
                                            },
                                            {
                                                "LevelTyp": "Effektiv",
                                                "Level": 3,
                                                "Id": "Backen"
                                            }
                                        ],
                                        "Fertigkeit": [
                                            {
                                                "Id": "Konditor"
                                            }
                                        ],
                                        "PfadKosten": "0",
                                        "WiederhoteNutzung": "1",
                                        "Id": "T",
                                        "Kosten": "0"
                                    }
                                ]
                            },
                            "Id": "Koch"
                        },
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Soldat"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    ""
                                ]
                            },
                            "Levels": {
                                "Level": [
                                    {
                                        "Talent": [
                                            {
                                                "LevelTyp": "Effektiv",
                                                "Level": 3,
                                                "Id": "Schwerter"
                                            }
                                        ],
                                        "PfadKosten": "0",
                                        "WiederhoteNutzung": "1",
                                        "Id": "T",
                                        "Kosten": "0"
                                    }
                                ]
                            },
                            "Id": "Soldat"
                        }
                    ],
                    "WiderholungMinimum": "1",
                    "WiderholungMaximum": 3,
                    "Id": "Proffession"
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Götter"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Wähle den Gott des Charakters"
                        ]
                    },
                    "Pfad": [
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Alsa"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    "Der Charakter ist ein Diener des Gottes Alsa."
                                ]
                            },
                            "Levels": {
                                "Level": [
                                    {
                                        "Besonderheit": [
                                            {
                                                "Id": "Auserwählter Alsas"
                                            }
                                        ],
                                        "PfadKosten": "0",
                                        "WiederhoteNutzung": "1",
                                        "Id": "T",
                                        "Kosten": "0"
                                    }
                                ]
                            },
                            "Id": "Alsas"
                        }
                    ],
                    "WiderholungMinimum": "1",
                    "WiderholungMaximum": "1",
                    "Id": "Götter"
                }
            ]
        },
        "Talente": {
            "Talent": [
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Fokus": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kampfgespür"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Die fähigkeit im Kampf immer den überblick zu halten."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Kampfgespür",
                    "Kategorie": "Kampf",
                    "Komplexität": "D"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fechtwaffen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Eine leichte und schnelle Waffe die vorallem auf präzision statt kraft setzt."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Fechtwaffen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stumpfe Hiebwaffen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Eine brachiale Waffe die ihre effiktivität aus der Kraft des nutzers zieht."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Stumpfe Hiebwaffen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Einhandäxte"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 2,
                                "Id": "Stumpfe Hiebwaffen"
                            }
                        ]
                    },
                    "Id": "Einhandäxte",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zweihandäxte"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Zweihandäxte",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stäbe"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Stäbe",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schwerter"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 3,
                                "Id": "Säbel"
                            }
                        ]
                    },
                    "Id": "Schwerter",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Säbel"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 2,
                                "Id": "Schwerter"
                            }
                        ]
                    },
                    "Id": "Säbel",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Anderthalbhänder"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 2,
                                "Id": "Säbel"
                            },
                            {
                                "Anzahl": 2,
                                "Id": "Schwerter"
                            },
                            {
                                "Anzahl": 2,
                                "Id": "Zweihandschwert"
                            }
                        ]
                    },
                    "Id": "Anderthalbhänder",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zweihandschwert"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Zweihandschwert",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zweihandhiebwaffe"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Zweihandhiebwaffe",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zweihandsäbel"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Zweihandsäbel",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Tonfas"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Tonfas",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Fokus": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Bogen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 7,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Bogen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Faust Projektielwaffen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Gewehre, Armbrüste"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 3,
                                "Id": "Zweihandprojektielwaffen"
                            }
                        ]
                    },
                    "Id": "Faust Projektielwaffen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zweihandprojektielwaffen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Gewehre, Armbrüste"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 2,
                                "Id": "Faust Projektielwaffen"
                            }
                        ]
                    },
                    "Id": "Zweihandprojektielwaffen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schild"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Schild",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Ausweichen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Ausweichen",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stangenwaffe"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Stangenwaffe",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Peitche"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Peitche",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Dolch"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Dolch",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Flegel"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Flegel",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Waffenlos"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Max": [
                            {
                                "Ableitung": [
                                    {
                                        "Anzahl": 4,
                                        "Id": "Schwerter"
                                    },
                                    {
                                        "Anzahl": 4,
                                        "Id": "Säbel"
                                    },
                                    {
                                        "Anzahl": 3,
                                        "Id": "Stumpfe Hiebwaffen"
                                    }
                                ],
                                "Anzahl": 3
                            }
                        ],
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Waffenlos",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Chakram"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Das Chakram (von Sanskrit: चक्र, cakra n., Nom. Sg. cakram, dt.: „Kreis“ oder „Rad“) ist eine Wurfwaffe, die in Indien benutzt wurde. Sie besteht aus einem flachen Metallring mit einem scharfen äußeren Rand von 12 bis 30 cm Durchmesser."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Chakram",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wurfspeer"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Wurfspeer",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wurfaxt"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Wurfaxt",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wurfmesser"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Wurfmesser",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Katar"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Das Katar, auch Coutar, Katah, Koutah, Kutah, Kutar, Bundi Dolch oder Jemdhar genannt, ist ein indischer Faustdolch. Der Ursprung liegt bei den Rajputen, aber die Waffe ist im indischen Raum weit verbreitet"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Katar",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wurfwaffe"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "z.B. Stein"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Wurfwaffe",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schleuder"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Schleuder",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Speerschleuder"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Speerschleuder",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Nunchaku"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Nunchaku",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Fokus": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Dreugliederstab"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 2,
                                "Id": "Nunchaku"
                            },
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            }
                        ]
                    },
                    "Id": "Dreigliederstab",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Fokus": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kettenwaffe"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "z.B. Suruchin, Manriki Gusari"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 3,
                                "Id": "Flegel"
                            }
                        ]
                    },
                    "Id": "Kettenwaffe",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sense"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Kampfgespür"
                            },
                            {
                                "Anzahl": 4,
                                "Id": "Zweihandhiebwaffe"
                            },
                            {
                                "Anzahl": 3,
                                "Id": "Stäbe"
                            }
                        ]
                    },
                    "Id": "Sense",
                    "Kategorie": "Kampf",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Springen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Springen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Laufen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Laufen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Beschatten"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Beschatten",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {},
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gewichtstemmen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Gewichtstemmen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schwimmen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schwimmen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Stärke": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Körperbeherschung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Körperbeherschung",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Akrobatik"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Akrobatik",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fingerübungen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Manschmal muss ein Charakter sehr prezise arbeit mit seinen Fingern durchführen. Seien es Taschenspieler Triks, wie das Hervorziehen einer Münze, oder den Bolzen möglichst zügig aus einer Felsspalte zu ziehen. In solchen Fällen steht das Tallent Fingerübungen zur verfügung."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fingerübungen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Klettern"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Klettern",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schleichen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schleichen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fliegen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fliegen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gaukelein"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Gaukeleien",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Sympathie": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Reiten"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Reiten",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sich Verstecken"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Sich Verstecken",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Singen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Singen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {},
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Skifahren"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Skifahren",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stimmen Imitieren"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Stimmen Imitieren",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Taschendiebstahl"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Taschendiebstahl",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zechen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Zechen",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Entfesseln"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Entfesseln",
                    "Kategorie": "Körper",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fährtensuche"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fährtensuche",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Orientierung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Orientierung",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Selbstbeherchung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Selbstbeherchung",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wahrnehmung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 3,
                                "Id": "Sehen"
                            },
                            {
                                "Anzahl": 3,
                                "Id": "Hören"
                            },
                            {
                                "Anzahl": 4,
                                "Id": "Fühlen"
                            },
                            {
                                "Anzahl": 5,
                                "Id": "Richen und Schmeken"
                            }
                        ]
                    },
                    "Id": "Wahrnehmung",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sehen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 4,
                                "Id": "Wahrnehmung"
                            }
                        ]
                    },
                    "Id": "Sehen",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Hören"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 4,
                                "Id": "Wahrnehmung"
                            }
                        ]
                    },
                    "Id": "Hören",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Richen und Schmeken"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 6,
                                "Id": "Wahrnehmung"
                            }
                        ]
                    },
                    "Id": "Richen und Schmeken",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fühlen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 5,
                                "Id": "Wahrnehmung"
                            }
                        ]
                    },
                    "Id": "Fühlen",
                    "Kategorie": "Geist",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Antipathie": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Menschenkentniss"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Menschenkentniss",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Verführen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Verführen",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Lügen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Lügen",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Überreden"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Überreden",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Antipathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Einschüchtern"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Einschüchtern",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gesellschaft"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Lehren",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schauspielerei"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schauspielerei",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schriftlicher Ausdruck"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schriftlicher Ausdruck",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Etikette"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Etikette",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Seelsorge"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Seelsorge",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sich Verkleiden"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Sich Verkleiden",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Tanzen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Tanzen",
                    "Kategorie": "Gesellschaft",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gassenwissen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Gassenwissen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Rechnen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Rechnen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Mut": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sagen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Sagen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Astronomi"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Astronomi",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Geographie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Geographie",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gesteinskunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Gesteinskunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Recherche"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Das finden von informationen in Büchern und Bibliotheken."
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Recherche",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Buchführung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Buchführung",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Medizin"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Medizin",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Tierkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Tierkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Pflanzenkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Pflanzenkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Glück": [
                            {}
                        ],
                        "Mut": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Kunst",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Klugheit": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Alchemischeswissen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Alchemischeswissen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wettervorhersage"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Wettervorhersage",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Anatomie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Anatomie",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Baukunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Baukunst",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Geselchaftsspiele"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Geselchaftsspiel",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Geschichtswissen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Geschichtswissen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Mystik"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Mystik",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Religion"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Religion",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Heraldik"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Heraldik",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Hüttenkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Hüttenkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Krigskunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Kriegskunst",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kryptographie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Kryptographie",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Magiekunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Magiekunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Mechanik"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Mechanik",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Philosophie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Philosophie",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Rechtskunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Rechtskunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schätzen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schätzen",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sprachenkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Sprachenkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Staatskunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Staatskunst",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Sternenkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Sternkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Giftkunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Giftkunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Krankheitskunde"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Krankheitskunde",
                    "Kategorie": "Wissen",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Alchemie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Alchemie",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Backen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 3,
                                "Id": "Richen und Schmeken"
                            }
                        ]
                    },
                    "Id": "Backen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kochen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Bedingungen": {
                        "Bedingung": [
                            {}
                        ]
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 2,
                                "Id": "Backen"
                            }
                        ]
                    },
                    "Id": "Kochen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Abrichten"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Abrichten",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Ackerbau"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Ackerbau",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Alchimie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Alchimie",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Bauer"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Bauer",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Bergbau"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Bergbau",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Botenbau"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Bogenbau",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Pfeilmacher"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Pfeilmacher",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Gewandtheit": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Boote Fahren"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Boote Fahren",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Drucker"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Drucker",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fahrzeuge Lenken"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fahrzeuge Lenken",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Mut": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Faöschspiel"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Falschspiel",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Feinmechanik"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Feinmechanik",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Feuersteinbearbeitung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Feuersteinbearbeitung",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fleicher"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fleischer",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Gerber"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 2,
                                "Id": "Kürschner"
                            }
                        ]
                    },
                    "Id": "Gerber",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kürschner"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Ableitungen": {
                        "Ableitung": [
                            {
                                "Anzahl": 2,
                                "Id": "Gerber"
                            }
                        ]
                    },
                    "Id": "Kürschner",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {},
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Glaskunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Glaskunst",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schmieden"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schmieden",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Handel"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Handel",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Hauswirtschaft"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Hauswirtschaft",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wundversorgung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Wundenversorgung",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Holzbbearbeitung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Holzbearbeitung",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Instrumentenbauer"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Instrumentenbauer",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Kartographie"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Kartographie",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Lederarbeiten"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Lederarbeiten",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zeichnen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Zeichnen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {},
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Malen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Malen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Maurer"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Maurer",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Metallguss"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Metallguss",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Sympathie": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Musizieren"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Musizieren",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schlösser Knacken"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schlösser Knacken",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schnaps brennen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schnaps brennen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Schneidern"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Schneidern",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Seefahrt"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Seefahrt",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {},
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Seiler"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Seiler",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {},
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Steinmetz"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Steinmetz",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Juwelier"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Juwelier",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stellmacher"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Stellmacher",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Stoffe Färben"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Stoffe Färben",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Tätowiren"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Tätowieren",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {},
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Töpfern"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Töpfern",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Intuition": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Viehzucht"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Viehzucht",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {},
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Webkunst"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Webkunst",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Winzer"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Winzer",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Zimmermann"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Zimmermann",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Klugheit": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fallenstellen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fallenstellen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Präzision": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fesseln"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fesseln",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Präzision": [
                            {}
                        ],
                        "Stärke": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Fischen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Fischen",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                },
                {
                    "Probe": {
                        "Intuition": [
                            {}
                        ],
                        "Gewandtheit": [
                            {}
                        ],
                        "Konstitution": [
                            {}
                        ]
                    },
                    "Name": {
                        "Lokalisirung": [
                            "Wildnissleben"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Id": "Wildnisleben",
                    "Kategorie": "Handwerk",
                    "Komplexität": "B"
                }
            ]
        },
        "Fertigkeiten": {
            "Fertigkeit": [
                {
                    "Name": {
                        "Lokalisirung": [
                            "Kulturkunde Alan"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Das Wissen um die Kultur der Alan"
                        ]
                    },
                    "Verbreitung": {
                        "Pfad": [
                            {
                                "Verbreitung": 7,
                                "Id": "Alan"
                            }
                        ],
                        "Wert": "3"
                    },
                    "Id": "Kulturkunde Alan",
                    "Kosten": 100
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Arjuniche Zeichen"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Die Schrift der Arjur"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "7"
                    },
                    "Tags": {
                        "Tag": [
                            {
                                "Id": "Lesen/Schreiben"
                            }
                        ]
                    },
                    "Id": "Arjuniche Zeichen",
                    "Kosten": 100
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Konditor"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Die kunst Süßes zu erstellen"
                        ]
                    },
                    "Verbreitung": {
                        "Wert": "4"
                    },
                    "Id": "Konditor",
                    "Kosten": 30
                }
            ]
        },
        "Besonderheiten": {
            "Besonderheit": [
                {
                    "Name": {
                        "Lokalisirung": [
                            "Auserwählter"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Der Charakter wurde von einem der Götter auserwählt"
                        ]
                    },
                    "Gebunden": true,
                    "Id": "Auserwählter",
                    "Kosten": 0
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Auserwählter Alsas"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Der Charakter wurde von einem der Götter auserwählt"
                        ]
                    },
                    "Gebunden": true,
                    "Id": "Auserwählter Alsas",
                    "Kosten": 0
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Miasma Resistenz"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Der Charakter hat eine erhöte Resistenz gegen das dämonische Miasma"
                        ]
                    },
                    "Bedingung": {
                        "Besonderheit": {
                            "Id": "Auserwählter"
                        }
                    },
                    "Gebunden": "false",
                    "Id": "Miasma Resistenz",
                    "Kosten": 0
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Verbesserte Wundheilung"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Die Wunden des Charakters heilen Schneller."
                        ]
                    },
                    "Bedingung": {
                        "Besonderheit": {
                            "Id": "Auserwählter"
                        }
                    },
                    "Gebunden": "false",
                    "Id": "Verbesserte Wundheilung",
                    "Kosten": 0
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Krankheitsresistenz"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            "Der Charakter wird troz wiedriger Umstände nicht so leicht Krank."
                        ]
                    },
                    "Bedingung": {
                        "Besonderheit": {
                            "Id": "Auserwählter"
                        }
                    },
                    "Gebunden": "false",
                    "Id": "Krankheitsresistenz",
                    "Kosten": 0
                },
                {
                    "Name": {
                        "Lokalisirung": [
                            "Beidhändig"
                        ]
                    },
                    "Beschreibung": {
                        "Lokalisirung": [
                            ""
                        ]
                    },
                    "Gebunden": "false",
                    "Id": "Beidhändig",
                    "Kosten": 3
                }
            ]
        },
        "Taktiken": {
            "Taktik": [
                {
                    "Beschreibung": "Ein standard angriff.",
                    "Kosten": 2,
                    "Belastung": 1,
                    "Typ": "Offensiv",
                    "Id": "Angriff"
                },
                {
                    "Beschreibung": "Ein leichter Angriff.",
                    "Erfolg": "Wenn eine andere Offensive Taktik dieses Charakters mehr oder gleich viel Schaden am selben Ziel verursacht, wird der Schaden negiert.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 5,
                            "Type": "Absolute"
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 1,
                    "Belastung": 0.5,
                    "Typ": "Offensiv",
                    "Id": "Leichter Angriff"
                },
                {
                    "Beschreibung": "Ein Angriff der wenig raum für Verteidigung läßt.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 5,
                            "Type": "Absolute"
                        },
                        "ModifierType": "Bonus"
                    },
                    "Kosten": 2,
                    "Belastung": 1.5,
                    "Typ": "Offensiv",
                    "Id": "Offensiver Angriff"
                },
                {
                    "Beschreibung": "Ein Angriff der die Verteidigung ignoriert.",
                    "Bedingung": "Keine Defensiven Taktiken.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 100,
                            "Type": "Percent"
                        },
                        "ModifierType": "Bonus"
                    },
                    "Kosten": 4,
                    "Belastung": 2,
                    "Typ": "Offensiv",
                    "Id": "Agressiver Angriff"
                },
                {
                    "Beschreibung": "Eine leichte Verteidigung.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 5,
                            "Type": "Absolute"
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 1,
                    "Belastung": 0.5,
                    "Typ": "Defensiv",
                    "Id": "Leichte Verteidigung"
                },
                {
                    "Beschreibung": "Eine Standard Verteidigung.",
                    "Kosten": 2,
                    "Belastung": 1,
                    "Typ": "Defensiv",
                    "Id": "Verteidigung"
                },
                {
                    "Beschreibung": "Eine Schwer durchdringbare verteidigung.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 5,
                            "Type": "Absolute"
                        },
                        "ModifierType": "Bonus"
                    },
                    "Kosten": 3,
                    "Belastung": 1.5,
                    "Typ": "Defensiv",
                    "Id": "Starke Verteidigung"
                },
                {
                    "Beschreibung": "Der Charakter konzentriert sich auf seine Verteidigung, auf kosten seiner Angriffe.",
                    "Bedingung": "Keine offensiven Taktiken.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 50,
                            "Type": "Percent"
                        },
                        "ModifierType": "Bonus"
                    },
                    "Kosten": 3,
                    "Belastung": 2,
                    "Typ": "Defensiv",
                    "Id": "Verteidigungshaltung"
                },
                {
                    "Beschreibung": "Ein gezielter Rückzug bei dem sich der Charakter aus dem Nahkampf lößt, ohne sich Preis zu geben",
                    "Erfolg": "Der Charakter lößt sich aus dem Nahkampf.",
                    "Kosten": 2,
                    "Belastung": 2,
                    "Typ": "Defensiv",
                    "Id": "Rückzug"
                },
                {
                    "Beschreibung": "Der Charakter entfernt sich aus dem Nahkampf ohne sich um seine Deckung zu kümmern.",
                    "GarantierterEffekt": "Der Charakter lößt sich aus dem Nahkampf.",
                    "Kosten": 3,
                    "Belastung": 1,
                    "Typ": "Neutral",
                    "Id": "Flucht"
                },
                {
                    "Beschreibung": "Der Charakter versucht mit dem Angriff den gegner eine Falle zu stellen und so stärker zu bedrängen.",
                    "SofortigerEffekt": "$x entspricht dem Bedränungsmalus des Ziels",
                    "Erfolg": "Das Ziel wird writer bedrängt anstelle das Schaden verursact wird.",
                    "Mod": {
                        "VariableModValueType": {
                            "Value": "X"
                        },
                        "ModifierType": "Malus"
                    },
                    "Eigenschaften": {
                        "Eigenschaft": {
                            "Id": "Präzise"
                        }
                    },
                    "Kosten": 1,
                    "Belastung": 1,
                    "Typ": "Offensiv",
                    "Id": "Finte"
                },
                {
                    "Beschreibung": "Setzt mehr Wucht in einen auszuführenden Angriff.",
                    "SofortigerEffekt": "$x ist  belibiger Wert bis zum doppelten Basiswuchtschaden der Waffe.",
                    "Erfolg": "Die Waffe Trift. Erhöht den Wuchtschaden der Waffe um $x.",
                    "Misserfolg": "Erhalte Positions Mali in höhe von $x.",
                    "Mod": {
                        "MultiplyModValueType": {
                            "ConcreteModValueType": [
                                {
                                    "Value": 2,
                                    "Type": "Absolute"
                                }
                            ],
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Eigenschaften": {
                        "Eigenschaft": {
                            "Id": "Wuchtig"
                        }
                    },
                    "Kosten": 3,
                    "Belastung": 1,
                    "Typ": "Offensiv",
                    "Id": "Wuchtiger Angriff"
                },
                {
                    "Beschreibung": "Der Charakter leitet einen Riskanten Angriff ein um den gegner einen Gefährlichen Treffer zu versetzen.",
                    "SofortigerEffekt": "$x ist ein belibiger Wert.",
                    "GarantierterEffekt": "Die Defenskiv Taktik des Ziels wird um $x reduziert.",
                    "Erfolg": "Wenn der Defensivtaktikwert des Ziels unter 0 sinkt, verursacht die Waffe Schaden.",
                    "Misserfolg": "Erhalte Positions Mali in höhe von 3$x.",
                    "Mod": {
                        "MultiplyModValueType": {
                            "ConcreteModValueType": [
                                {
                                    "Value": 3,
                                    "Type": "Absolute"
                                }
                            ],
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 5,
                    "Belastung": 2,
                    "Typ": "Offensiv",
                    "Id": "Todesstoß"
                },
                {
                    "Beschreibung": "Eine Taktik an deren ende die Waffe an eine empfindliche stelle, wie beispielsweise Kehle, Plaziert wurde.",
                    "Bedingung": "Pro Waffe kann nur eine Aktion Waffe Platzieren gewählt werden.",
                    "SofortigerEffekt": "$x ist ein belibiger Wert.",
                    "Erfolg": "Führt das Ziel nächste Runde eine Offensive Taktik aus erhält es den Schnittschaden der Waffe. Sollte die Taktik nur eine Defensive sein, so wird der Schaden nur erlitten falls diese ein Misserfolg ist.\n\nZusätzlich erhällt das Ziel nächste runde einen zusätzlichen Malus von $x auf alle Offensiven Taktiken und der Charakter einen Bonus von $x auf alle Defensiven Taktiken.\n\nAusserdem darf eine Waffe Plazieren Taktik die das selbe Ziel wie diese hat in der Nächsten runde durch eine andere Taktik ausgetauscht werden, nachdem alle Aktionen bekannt gegeben wurden. Als Trefferzone kann die selebe Zone gewählt werden die diese Aktion getroffen hat. In diesem Fall kann eine belibige Unterzone gewählt werden.",
                    "Mod": {
                        "AddModValueType": {
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ],
                            "ConcreteModValueType": [
                                {
                                    "Value": 5,
                                    "Type": "Absolute"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 2,
                    "Belastung": 2,
                    "Typ": "Offensiv",
                    "Id": "Waffe Platzieren"
                },
                {
                    "Beschreibung": "Der Charakter übernimmt den Schutz eines anderen.",
                    "Bedingung": "Das Ziel darf keine Offensive Taktik nutzen.",
                    "SofortigerEffekt": "Diese Taktik gillt als Defensive Aktion des zu schützenden Ziels und nicht für den ausführenden Charakter.",
                    "Kosten": 3,
                    "Belastung": 1,
                    "Typ": "Defensiv",
                    "Id": "Schutz"
                },
                {
                    "Beschreibung": "Der Charakter versucht seine Position zu verbessern.",
                    "SofortigerEffekt": "Diese Defensive Taktik führt nicht zum Misserfolg einer gengerichen Offensiven Taktik und verhindert keinen Schaden.",
                    "Erfolg": "Der Charakter baut die hälfte seiner Stellenmali ab (aufgerundet).",
                    "Misserfolg": "Der Charakter baut ein virtel seiner Stellenmali ab (aufgerundet). Würde der Charakter diese runde Stellen Mali bekommen, entfellt der Effekt dafür wird der erhaltene Mali um die hälfte Reduziert.",
                    "Kosten": 2,
                    "Belastung": 1,
                    "Typ": "Defensiv",
                    "Id": "Position"
                },
                {
                    "Beschreibung": "Der Charakter kann am ende der Kampfrunde mehr sagen als er eigentlich dürfte. Er kann einen ungefähr 5 sekunden lange nachricht von sich geben.",
                    "SofortigerEffekt": "Der Charakter erhält einen Malus von 1 auf alle Aktionen. Wenn dies die einzige Aktion ist, werden die Kosten auf 0 reduziert.",
                    "Kosten": 1,
                    "Belastung": 0,
                    "Typ": "Neutral",
                    "Id": "Reden"
                },
                {
                    "Beschreibung": "Bei diesem Angriff nutzt der Charakter die Schneide seiner Waffe an einer äußerst empfindlichen stelle, wie beispielsweise dem Hals. Oder Durschtößt mit der Klinge den Körper des Gegners. Ein bevorzugter Angriff von meuchlern.",
                    "Erfolg": "Der Wuchtschaden der Waffe wird auf 0 gesetzt (Wuchtschläge funktionieren). Der Angriff erhält die Eigenschaft Tödlich.",
                    "Mod": {
                        "ConcreteModValueType": {
                            "Value": 50,
                            "Type": "Percent"
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 2,
                    "Belastung": 0.5,
                    "Typ": "Unterstützend",
                    "Id": "Zustechen"
                },
                {
                    "Beschreibung": "Der Kämpfer versucht ein bestimmtes Körperteil gezielt zu treffen.",
                    "SofortigerEffekt": "$x ist ien belibiger Wert.",
                    "Erfolg": "Es werden $x mehr Trefferzonen bestimmt. Wähle eine dieser.",
                    "Mod": {
                        "MultiplyModValueType": {
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                },
                                {
                                    "Value": "X"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Eigenschaften": {
                        "Eigenschaft": {
                            "Id": "Präzise"
                        }
                    },
                    "Kosten": 1,
                    "Belastung": 0,
                    "Typ": "Unterstützend",
                    "Id": "Gezielter Angriff"
                },
                {
                    "Beschreibung": "Erlaubt dem Angreifer an der Rüstung des Gegners Vorbei zu stechen..",
                    "Bedingung": "Nur mit Präzisen Waffen möglich.",
                    "SofortigerEffekt": "$x ist ien belibiger Wert.",
                    "Erfolg": "Bei genauer bestimmung der Trefferzone (W10) kann $x zum Ergebniss Addiert oder Subtrahiert werden.",
                    "Mod": {
                        "MultiplyModValueType": {
                            "ConcreteModValueType": [
                                {
                                    "Value": 2,
                                    "Type": "Absolute"
                                }
                            ],
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Eigenschaften": {
                        "Eigenschaft": {
                            "Id": "Präzise"
                        }
                    },
                    "Kosten": 1,
                    "Belastung": 0,
                    "Typ": "Unterstützend",
                    "Id": "Präziser Angriff"
                },
                {
                    "Beschreibung": "Der Charakter erholt sich",
                    "GarantierterEffekt": "Der Charakter regeneriert alle Erschöpfung, wenn dies seien einzigste Aktion ist. Andernfalls die Hälfte.",
                    "Kosten": 0,
                    "Belastung": 1,
                    "Typ": "Neutral",
                    "Id": "Erholen / Abwarten"
                },
                {
                    "Beschreibung": "Der Charakter bereitet einen gezielten Schuss vor.",
                    "Bedingung": "Nur mit Fernkampfwaffe",
                    "SofortigerEffekt": "$x entspricht der Fernkampfmodifikation. (Siehe Tabelle)",
                    "Erfolg": "Der Charakter erhält einen Bonus in Höhe der halben Punkte auf seine nächste Taktik falls diese das selbe Ziel hat und mit der selben Waffe erfolt.",
                    "Mod": {
                        "MultiplyModValueType": {
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ],
                            "ConcreteModValueType": [
                                {
                                    "Value": 50,
                                    "Type": "Percent"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 1,
                    "Belastung": 2,
                    "Typ": "Neutral",
                    "Id": "Zielen"
                },
                {
                    "Beschreibung": "Der Charakter führt einen gezielten Schuss durch.",
                    "SofortigerEffekt": "$x entspricht der Fernkampf modifikation.",
                    "Erfolg": "Der Charakter Trifft das Ziel einmal.",
                    "Mod": {
                        "SubstractModValueType": {
                            "VariableModValueType": [
                                {
                                    "Value": "X"
                                }
                            ],
                            "ConcreteModValueType": [
                                {
                                    "Value": 3,
                                    "Type": "Absolute"
                                }
                            ]
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 1,
                    "Belastung": 2,
                    "Typ": "Offensiv",
                    "Id": "Gezielter Schuss"
                },
                {
                    "Beschreibung": "Schießt mit einer Distanzwaffe bis zur maximalen schussfrequenz.",
                    "SofortigerEffekt": "$x entspricht der Fernkampfmodifikation.",
                    "Erfolg": "Der Charakter Trifft das Ziel entsprechend der Feuerrate.",
                    "Mod": {
                        "VariableModValueType": {
                            "Value": "X"
                        },
                        "ModifierType": "Malus"
                    },
                    "Kosten": 2,
                    "Belastung": 2,
                    "Typ": "Offensiv",
                    "Id": "Mehrfachschuss"
                },
                {
                    "Beschreibung": "In manschen situation ist es ratsam nicht mit der Waffe zu parieren, sondern dem Angriff aus dem Weg zughen.",
                    "Kosten": 3,
                    "Belastung": 1,
                    "Typ": "Defensiv",
                    "Id": "Ausweichen"
                },
                {
                    "Beschreibung": "Hüllt die Waffe in Flammen und erhöt die Reichweite.",
                    "Bedingung": "Charakter Feueradept",
                    "Erfolg": "Erhöt die DK der Waffe nächste Runde um eins. Für je volle 3 Punkte hält der Effekt 1 Runde länger.",
                    "Kosten": 4,
                    "Belastung": 2,
                    "Typ": "Neutral",
                    "Id": "Flammenklinge"
                },
                {
                    "Beschreibung": "Erzeugt Flammenwände.",
                    "Bedingung": "Charakter Feueradept",
                    "Erfolg": "Für je 2 Punkte kann der Charakter einen Meter wand erzeugen startend vor ihm. Die Wand hält 3 Runden.",
                    "Kosten": 9,
                    "Belastung": 2,
                    "Typ": "Neutral",
                    "Id": "Flammenwand"
                }
            ],
            "Eigenschaften": [
                {
                    "Eigenschaft": [
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Präzise"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    "Eine Aktion die besonders Präzises vorgehen verlangt."
                                ]
                            },
                            "Id": "Präzise"
                        },
                        {
                            "Name": {
                                "Lokalisirung": [
                                    "Wuchtig"
                                ]
                            },
                            "Beschreibung": {
                                "Lokalisirung": [
                                    "Eine Aktoin bei der es auf Brachiale gewalt ankommt."
                                ]
                            },
                            "Id": "Wuchtig"
                        }
                    ]
                }
            ]
        },
        "Ausstattung": {
            "Waffen": {
                "Nahkampfwaffe": [
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Floret"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Eigenschaften": {
                            "Eigenschaft": {
                                "Id": "Präzise"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Fechtwaffen"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Floret"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Rapier"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "1"
                            },
                            "Schnitt": {
                                "Schaden": "3"
                            }
                        },
                        "Eigenschaften": {
                            "Eigenschaft": {
                                "Id": "Präzise"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Fechtwaffen"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Rapier"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Schwert"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "3"
                            },
                            "Schnitt": {
                                "Schaden": "3"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Schwerter"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Schwert"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Axt"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "5"
                            },
                            "Schnitt": {
                                "Schaden": "4"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Einhandäxte"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Axt"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Dolch"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Dolch"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 1,
                        "Id": "Dolch"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Speer"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "1"
                            },
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Stangenwaffe"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 3,
                        "Id": "Speer"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Harpune"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "1"
                            },
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Eigenschaften": {
                            "Eigenschaft": {
                                "Id": "Wiederharken"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Stangenwaffe"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 3,
                        "Id": "Harpune"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Gleve"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "2"
                            },
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Stangenwaffe"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 3,
                        "Id": "Gleve"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Keule"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "3"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Stumpfe Hiebwaffen"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Keule"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Hammer"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "6"
                            }
                        },
                        "Eigenschaften": {
                            "Eigenschaft": {
                                "Id": "Wuchtig"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Stumpfe Hiebwaffen"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 2,
                        "Id": "Hammer"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Anderthalbhänder"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "4"
                            },
                            "Schnitt": {
                                "Schaden": "3"
                            }
                        },
                        "Talente": {
                            "Talent": {
                                "LevelTyp": "Effektiv",
                                "Level": "1",
                                "Id": "Anderthalbhänder"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Distanzklasse": 3,
                        "Id": "Anderthalbhänder"
                    }
                ],
                "Fernkampfwaffe": [
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Kompositbogen"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schaden": {
                            "Wucht": {
                                "Schaden": "2"
                            },
                            "Schnitt": {
                                "Schaden": "2"
                            }
                        },
                        "Schusseigenschaften": {
                            "Schussfrequenz": 5,
                            "Magazingröße": 1
                        },
                        "Reichweiten": {
                            "Reichweite": [
                                {
                                    "Distanz": "Nahkampf",
                                    "Modifikator": -10,
                                    "Schadensreduktion": 2
                                },
                                {
                                    "Distanz": 10,
                                    "Modifikator": 0
                                },
                                {
                                    "Distanz": 20,
                                    "Modifikator": -2
                                },
                                {
                                    "Distanz": 40,
                                    "Modifikator": -4
                                },
                                {
                                    "Distanz": 80,
                                    "Modifikator": -6
                                },
                                {
                                    "Distanz": 120,
                                    "Modifikator": -8
                                },
                                {
                                    "Distanz": 160,
                                    "Modifikator": -10
                                },
                                {
                                    "Distanz": 200,
                                    "Modifikator": -14
                                },
                                {
                                    "Distanz": 400,
                                    "Modifikator": -20
                                },
                                {
                                    "Distanz": 500,
                                    "Modifikator": -25
                                }
                            ]
                        },
                        "Nachladezeit": {
                            "Wert": 1,
                            "Einheit": "S"
                        },
                        "Eigenschaften": {
                            "Eigenschaft": {
                                "Id": "Rüstungsbrechend"
                            }
                        },
                        "WaffenTyp": "Offensiv|Defensiv",
                        "DefensivModifizierer": "0",
                        "OffensivModifizierer": "0",
                        "Id": "Kompositbogen"
                    }
                ]
            },
            "Rüstungen": {
                "Rüstung": [
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Lederharnisch"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schutz": {
                            "Flexibilität": {
                                "Wert": 3
                            },
                            "Härte": {
                                "Wert": 3
                            }
                        },
                        "Trefferzonen": {
                            "Brust": {
                                "Schutz": [
                                    {
                                        "Von": 2,
                                        "Bis": 10
                                    }
                                ]
                            },
                            "Bauch": {
                                "Schutz": [
                                    {
                                        "Von": 1,
                                        "Bis": 9
                                    }
                                ]
                            }
                        },
                        "Erschwernis": 1,
                        "Id": "Lederharnisch"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "MetallHarnich"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schutz": {
                            "Flexibilität": {
                                "Wert": 1
                            },
                            "Härte": {
                                "Wert": 6
                            }
                        },
                        "Trefferzonen": {
                            "Brust": {
                                "Schutz": [
                                    {
                                        "Von": 2,
                                        "Bis": 10
                                    }
                                ]
                            },
                            "Bauch": {
                                "Schutz": [
                                    {
                                        "Von": 1,
                                        "Bis": 9
                                    }
                                ]
                            }
                        },
                        "Erschwernis": 1,
                        "Id": "MetallHarnich"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Kettenhemd"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schutz": {
                            "Flexibilität": {
                                "Wert": 2
                            },
                            "Härte": {
                                "Wert": 6
                            }
                        },
                        "Trefferzonen": {
                            "Brust": {
                                "Schutz": [
                                    {
                                        "Von": 2,
                                        "Bis": 10
                                    }
                                ]
                            },
                            "Bauch": {
                                "Schutz": [
                                    {
                                        "Von": 1,
                                        "Bis": 9
                                    }
                                ]
                            }
                        },
                        "Erschwernis": 1,
                        "Id": "Kettenhemd"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Gambesong"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                ""
                            ]
                        },
                        "Schutz": {
                            "Flexibilität": {
                                "Wert": 4
                            },
                            "Dämpfung": {
                                "Wert": 4
                            }
                        },
                        "Trefferzonen": {
                            "Brust": {
                                "Schutz": [
                                    {
                                        "Von": 2,
                                        "Bis": 10
                                    }
                                ]
                            },
                            "Bauch": {
                                "Schutz": [
                                    {
                                        "Von": 1,
                                        "Bis": 9
                                    }
                                ]
                            }
                        },
                        "Erschwernis": 1,
                        "Id": "Gambesong"
                    }
                ]
            },
            "Eigenschaften": {
                "Eigenschaft": [
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Präzise"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Eine Waffe mit der Eigenschaft Präzise ist in der Lage die Rüstung des Gegners zu umgehen. Für alle Präzisen Manöver sind die Erschwernisse halbiert."
                            ]
                        },
                        "Id": "Präzise"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Wuchtig"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Wuchtige waffen erleichtern es sie mit brachialer gewallt einzusetzen. Für alle Aktionen mit der Eigenschaft Wuchtig ist die Erschwerniss halbiert."
                            ]
                        },
                        "Id": "Wuchtig"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Durchschalgend"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Der Wuchtschaden wird für die berechnungs des Schnittschadens verdoppelt."
                            ]
                        },
                        "Id": "Durchschalgend"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Rüstungsbrechend"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Der Wuchtschaden wird für die berechnungs des Schnittschadens Verdreifacht."
                            ]
                        },
                        "Id": "Rüstungsbrechend"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Tödlich"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Schnittschaden der im bereich Kopf, Brust Hüfte verursacht wird, wird verdoppelt."
                            ]
                        },
                        "Id": "Tödlich"
                    },
                    {
                        "Name": {
                            "Lokalisirung": [
                                "Wiederharken"
                            ]
                        },
                        "Beschreibung": {
                            "Lokalisirung": [
                                "Waffe kann sich im Opfer verfangen, und fügt beim entfernen 1 Blutungsschaden zu."
                            ]
                        },
                        "Id": "Wiederharken"
                    }
                ]
            }
        },
        "Tags": {
            "Tag": [
                {}
            ]
        },
        "Version": 1
    }
};

const expect = chai.expect;

describe('Parse', () => {



    it('should be able to parse without namespaces correctly', async () => {

        const uri = 'https://nota-game.github.io/schema/vNext/nota.xsd';
        const uri2 = 'https://nota-game.github.io/Content/vNext/data/nota.xml';
        const schemas = await downloadXsd(uri);
        const parsing = parseSchemas(schemas);
        const elements = (await parsing);
        const types = await generateTypes(elements);

        // await fs.promises.writeFile('tmp.ts', Object.entries(types).map(x => ` export type ${x[0]} = ${x[1]}\n`))

        const parser = new Parser<any>(elements.filter(x => x.name.local === 'Daten')[0]);
        const response = await fetch(uri2);
        const xml = await response.text();

        const parsed = parser.parse(xml);
        // await fs.promises.writeFile('tmp.json', JSON.stringify(parsed, undefined, ' '))
        expect(parsed).like(expected);
    }).timeout(10000);

});