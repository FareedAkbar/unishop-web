const cities = [
    {stateCode: "ACT",
        city: [
            {
                "value": 3915,
                "label": "Acton"
            },
            {
                "value": 3923,
                "label": "Ainslie"
            },
            {
                "value": 3974,
                "label": "Amaroo"
            },
            {
                "value": 3995,
                "label": "Aranda"
            },
            {
                "value": 4098,
                "label": "Banks"
            },
            {
                "value": 4129,
                "label": "Barton"
            },
            {
                "value": 4184,
                "label": "Belconnen"
            },
            {
                "value": 4331,
                "label": "Bonner"
            },
            {
                "value": 4338,
                "label": "Bonython"
            },
            {
                "value": 4377,
                "label": "Braddon"
            },
            {
                "value": 4436,
                "label": "Bruce"
            },
            {
                "value": 4536,
                "label": "Calwell"
            },
            {
                "value": 4555,
                "label": "Campbell"
            },
            {
                "value": 4566,
                "label": "Canberra"
            },
            {
                "value": 4621,
                "label": "Casey"
            },
            {
                "value": 4662,
                "label": "Chapman"
            },
            {
                "value": 4669,
                "label": "Charnwood"
            },
            {
                "value": 4687,
                "label": "Chifley"
            },
            {
                "value": 4697,
                "label": "Chisholm"
            },
            {
                "value": 4708,
                "label": "City"
            },
            {
                "value": 4787,
                "label": "Conder"
            },
            {
                "value": 4799,
                "label": "Cook"
            },
            {
                "value": 4816,
                "label": "Coombs"
            },
            {
                "value": 4855,
                "label": "Crace"
            },
            {
                "value": 4916,
                "label": "Curtin"
            },
            {
                "value": 4957,
                "label": "Deakin"
            },
            {
                "value": 4989,
                "label": "Dickson"
            },
            {
                "value": 5024,
                "label": "Downer"
            },
            {
                "value": 5036,
                "label": "Duffy"
            },
            {
                "value": 5046,
                "label": "Dunlop"
            },
            {
                "value": 5197,
                "label": "Evatt"
            },
            {
                "value": 5204,
                "label": "Fadden"
            },
            {
                "value": 5219,
                "label": "Farrer"
            },
            {
                "value": 5239,
                "label": "Fisher"
            },
            {
                "value": 5257,
                "label": "Florey"
            },
            {
                "value": 5258,
                "label": "Flynn"
            },
            {
                "value": 5261,
                "label": "Forde"
            },
            {
                "value": 5270,
                "label": "Forrest"
            },
            {
                "value": 5278,
                "label": "Franklin"
            },
            {
                "value": 5284,
                "label": "Fraser"
            },
            {
                "value": 5306,
                "label": "Garran"
            },
            {
                "value": 5336,
                "label": "Gilmore"
            },
            {
                "value": 5340,
                "label": "Giralang"
            },
            {
                "value": 5420,
                "label": "Gordon"
            },
            {
                "value": 5429,
                "label": "Gowrie"
            },
            {
                "value": 5461,
                "label": "Greenway"
            },
            {
                "value": 5472,
                "label": "Griffith"
            },
            {
                "value": 5485,
                "label": "Gungahlin"
            },
            {
                "value": 5498,
                "label": "Hackett"
            },
            {
                "value": 5531,
                "label": "Harrison"
            },
            {
                "value": 5538,
                "label": "Hawker"
            },
            {
                "value": 5592,
                "label": "Higgins"
            },
            {
                "value": 5629,
                "label": "Holder"
            },
            {
                "value": 5639,
                "label": "Holt"
            },
            {
                "value": 5663,
                "label": "Hughes"
            },
            {
                "value": 5707,
                "label": "Isaacs"
            },
            {
                "value": 5708,
                "label": "Isabella Plains"
            },
            {
                "value": 5758,
                "label": "Kaleen"
            },
            {
                "value": 5768,
                "label": "Kambah"
            },
            {
                "value": 5886,
                "label": "Kingston"
            },
            {
                "value": 5980,
                "label": "Latham"
            },
            {
                "value": 6091,
                "label": "Lyneham"
            },
            {
                "value": 6093,
                "label": "Lyons"
            },
            {
                "value": 6097,
                "label": "Macarthur"
            },
            {
                "value": 6102,
                "label": "Macgregor"
            },
            {
                "value": 6112,
                "label": "Macquarie"
            },
            {
                "value": 6205,
                "label": "Mawson"
            },
            {
                "value": 6218,
                "label": "McKellar"
            },
            {
                "value": 6234,
                "label": "Melba"
            },
            {
                "value": 6345,
                "label": "Monash"
            },
            {
                "value": 6533,
                "label": "Narrabundah"
            },
            {
                "value": 6583,
                "label": "Ngunnawal"
            },
            {
                "value": 6587,
                "label": "Nicholls"
            },
            {
                "value": 6691,
                "label": "O'Connor"
            },
            {
                "value": 6749,
                "label": "Oxley"
            },
            {
                "value": 6761,
                "label": "Page"
            },
            {
                "value": 6770,
                "label": "Palmerston"
            },
            {
                "value": 6820,
                "label": "Pearce"
            },
            {
                "value": 6848,
                "label": "Phillip"
            },
            {
                "value": 6977,
                "label": "Red Hill"
            },
            {
                "value": 6992,
                "label": "Reid"
            },
            {
                "value": 7004,
                "label": "Richardson"
            },
            {
                "value": 7031,
                "label": "Rivett"
            },
            {
                "value": 7157,
                "label": "Scullin"
            },
            {
                "value": 7303,
                "label": "Spence"
            },
            {
                "value": 7348,
                "label": "Stirling"
            },
            {
                "value": 7498,
                "label": "Theodore"
            },
            {
                "value": 7544,
                "label": "Torrens"
            },
            {
                "value": 7582,
                "label": "Turner"
            },
            {
                "value": 7693,
                "label": "Wanniassa"
            },
            {
                "value": 7697,
                "label": "Waramanga"
            },
            {
                "value": 7735,
                "label": "Watson"
            },
            {
                "value": 7753,
                "label": "Weetangera"
            },
            {
                "value": 7827,
                "label": "Weston"
            },
            {
                "value": 7955,
                "label": "Wright"
            },
            {
                "value": 8002,
                "label": "Yarralumla"
            }
        ]
    },
    {stateCode: "NSW",
        city: [
            {
                "value": 3903,
                "label": "Abbotsbury"
            },
            {
                "value": 3905,
                "label": "Abbotsford"
            },
            {
                "value": 3906,
                "label": "Abercrombie"
            },
            {
                "value": 3907,
                "label": "Aberdare"
            },
            {
                "value": 3908,
                "label": "Aberdeen"
            },
            {
                "value": 3911,
                "label": "Aberglasslyn"
            },
            {
                "value": 3912,
                "label": "Abermain"
            },
            {
                "value": 3913,
                "label": "Acacia Gardens"
            },
            {
                "value": 3917,
                "label": "Adamstown"
            },
            {
                "value": 3918,
                "label": "Adamstown Heights"
            },
            {
                "value": 3924,
                "label": "Airds"
            },
            {
                "value": 3937,
                "label": "Albion Park"
            },
            {
                "value": 3938,
                "label": "Albion Park Rail"
            },
            {
                "value": 3939,
                "label": "Albury"
            },
            {
                "value": 3940,
                "label": "Albury Municipality"
            },
            {
                "value": 3941,
                "label": "Aldavilla"
            },
            {
                "value": 3950,
                "label": "Alexandria"
            },
            {
                "value": 3952,
                "label": "Alfords Point"
            },
            {
                "value": 3959,
                "label": "Allambie Heights"
            },
            {
                "value": 3961,
                "label": "Allawah"
            },
            {
                "value": 3968,
                "label": "Alstonville"
            },
            {
                "value": 3975,
                "label": "Ambarvale"
            },
            {
                "value": 3983,
                "label": "Anna Bay"
            },
            {
                "value": 3984,
                "label": "Annandale"
            },
            {
                "value": 3986,
                "label": "Annangrove"
            },
            {
                "value": 3991,
                "label": "Appin"
            },
            {
                "value": 3997,
                "label": "Arcadia"
            },
            {
                "value": 3998,
                "label": "Arcadia vale"
            },
            {
                "value": 4002,
                "label": "Argenton"
            },
            {
                "value": 4005,
                "label": "Armidale"
            },
            {
                "value": 4007,
                "label": "Arncliffe"
            },
            {
                "value": 4009,
                "label": "Artarmon"
            },
            {
                "value": 4018,
                "label": "Ashbury"
            },
            {
                "value": 4020,
                "label": "Ashcroft"
            },
            {
                "value": 4022,
                "label": "Ashfield"
            },
            {
                "value": 4025,
                "label": "Ashmont"
            },
            {
                "value": 4027,
                "label": "Ashtonfield"
            },
            {
                "value": 4032,
                "label": "Asquith"
            },
            {
                "value": 4040,
                "label": "Auburn"
            },
            {
                "value": 4046,
                "label": "Austinmer"
            },
            {
                "value": 4048,
                "label": "Austral"
            },
            {
                "value": 4055,
                "label": "Avoca Beach"
            },
            {
                "value": 4056,
                "label": "Avondale"
            },
            {
                "value": 4074,
                "label": "Balgowlah"
            },
            {
                "value": 4075,
                "label": "Balgowlah Heights"
            },
            {
                "value": 4076,
                "label": "Balgownie"
            },
            {
                "value": 4084,
                "label": "Ballina"
            },
            {
                "value": 4085,
                "label": "Balmain"
            },
            {
                "value": 4086,
                "label": "Balmain East"
            },
            {
                "value": 4090,
                "label": "Balranald"
            },
            {
                "value": 4095,
                "label": "Bangalow"
            },
            {
                "value": 4096,
                "label": "Bangor"
            },
            {
                "value": 4099,
                "label": "Banksia"
            },
            {
                "value": 149215,
                "label": "Banksmeadow"
            },
            {
                "value": 4103,
                "label": "Bankstown"
            },
            {
                "value": 4105,
                "label": "Banora Point"
            },
            {
                "value": 4108,
                "label": "Bar Beach"
            },
            {
                "value": 4112,
                "label": "Barden Ridge"
            },
            {
                "value": 4113,
                "label": "Bardia"
            },
            {
                "value": 4115,
                "label": "Bardwell Park"
            },
            {
                "value": 4116,
                "label": "Bardwell Valley"
            },
            {
                "value": 4119,
                "label": "Bargo"
            },
            {
                "value": 4120,
                "label": "Barham"
            },
            {
                "value": 4124,
                "label": "Barnsley"
            },
            {
                "value": 4125,
                "label": "Barooga"
            },
            {
                "value": 4127,
                "label": "Barraba"
            },
            {
                "value": 4128,
                "label": "Barrack Heights"
            },
            {
                "value": 4132,
                "label": "Basin View"
            },
            {
                "value": 4134,
                "label": "Bass Hill"
            },
            {
                "value": 4136,
                "label": "Bateau Bay"
            },
            {
                "value": 4137,
                "label": "Batehaven"
            },
            {
                "value": 4139,
                "label": "Batemans Bay"
            },
            {
                "value": 4140,
                "label": "Bathurst"
            },
            {
                "value": 4142,
                "label": "Bathurst city centre"
            },
            {
                "value": 4141,
                "label": "Bathurst Regional"
            },
            {
                "value": 4143,
                "label": "Batlow"
            },
            {
                "value": 4146,
                "label": "Baulkham Hills"
            },
            {
                "value": 4149,
                "label": "Bay View"
            },
            {
                "value": 4159,
                "label": "Beacon Hill"
            },
            {
                "value": 4169,
                "label": "Beaumont Hills"
            },
            {
                "value": 4177,
                "label": "Beecroft"
            },
            {
                "value": 4181,
                "label": "Bega"
            },
            {
                "value": 4182,
                "label": "Bega Valley"
            },
            {
                "value": 4186,
                "label": "Belfield"
            },
            {
                "value": 4193,
                "label": "Bella Vista"
            },
            {
                "value": 4195,
                "label": "Bellambi"
            },
            {
                "value": 4197,
                "label": "Bellbird"
            },
            {
                "value": 4203,
                "label": "Bellevue Hill"
            },
            {
                "value": 4205,
                "label": "Bellingen"
            },
            {
                "value": 4207,
                "label": "Belmont"
            },
            {
                "value": 4211,
                "label": "Belmont North"
            },
            {
                "value": 4212,
                "label": "Belmont South"
            },
            {
                "value": 4213,
                "label": "Belmore"
            },
            {
                "value": 4214,
                "label": "Belrose"
            },
            {
                "value": 4222,
                "label": "Bensville"
            },
            {
                "value": 4227,
                "label": "Berala"
            },
            {
                "value": 4228,
                "label": "Beresfield"
            },
            {
                "value": 4230,
                "label": "Berkeley"
            },
            {
                "value": 4231,
                "label": "Berkeley Vale"
            },
            {
                "value": 4232,
                "label": "Berkshire Park"
            },
            {
                "value": 4233,
                "label": "Bermagui"
            },
            {
                "value": 4234,
                "label": "Berowra"
            },
            {
                "value": 4235,
                "label": "Berowra Heights"
            },
            {
                "value": 4238,
                "label": "Berridale"
            },
            {
                "value": 4240,
                "label": "Berrigan"
            },
            {
                "value": 4243,
                "label": "Berry"
            },
            {
                "value": 4251,
                "label": "Beverley Park"
            },
            {
                "value": 4252,
                "label": "Beverly Hills"
            },
            {
                "value": 4253,
                "label": "Bexley"
            },
            {
                "value": 4254,
                "label": "Bexley North"
            },
            {
                "value": 4257,
                "label": "Bidwill"
            },
            {
                "value": 4259,
                "label": "Bilambil Heights"
            },
            {
                "value": 4260,
                "label": "Bilgola Plateau"
            },
            {
                "value": 4265,
                "label": "Bingara"
            },
            {
                "value": 4267,
                "label": "Birchgrove"
            },
            {
                "value": 4271,
                "label": "Birmingham Gardens"
            },
            {
                "value": 4272,
                "label": "Birrong"
            },
            {
                "value": 4282,
                "label": "Blackalls Park"
            },
            {
                "value": 4286,
                "label": "Blackbutt"
            },
            {
                "value": 4287,
                "label": "Blackett"
            },
            {
                "value": 4288,
                "label": "Blackheath"
            },
            {
                "value": 4291,
                "label": "Blacksmiths"
            },
            {
                "value": 4293,
                "label": "Blacktown"
            },
            {
                "value": 4294,
                "label": "Blackwall"
            },
            {
                "value": 4298,
                "label": "Blair Athol"
            },
            {
                "value": 4300,
                "label": "Blakehurst"
            },
            {
                "value": 4302,
                "label": "Bland"
            },
            {
                "value": 4303,
                "label": "Blaxland"
            },
            {
                "value": 4304,
                "label": "Blayney"
            },
            {
                "value": 4306,
                "label": "Bligh Park"
            },
            {
                "value": 4308,
                "label": "Blue Bay"
            },
            {
                "value": 4309,
                "label": "Blue Haven"
            },
            {
                "value": 4310,
                "label": "Blue Mountains Municipality"
            },
            {
                "value": 4313,
                "label": "Boambee"
            },
            {
                "value": 4314,
                "label": "Boambee East"
            },
            {
                "value": 4316,
                "label": "Bogan"
            },
            {
                "value": 4317,
                "label": "Bogangar"
            },
            {
                "value": 4318,
                "label": "Boggabri"
            },
            {
                "value": 4321,
                "label": "Bolton Point"
            },
            {
                "value": 4322,
                "label": "Bolwarra Heights"
            },
            {
                "value": 4323,
                "label": "Bomaderry"
            },
            {
                "value": 4324,
                "label": "Bombala"
            },
            {
                "value": 4326,
                "label": "Bondi"
            },
            {
                "value": 4327,
                "label": "Bondi Beach"
            },
            {
                "value": 4328,
                "label": "Bondi Junction"
            },
            {
                "value": 4330,
                "label": "Bonnells Bay"
            },
            {
                "value": 4332,
                "label": "Bonnet Bay"
            },
            {
                "value": 4333,
                "label": "Bonny Hills"
            },
            {
                "value": 4334,
                "label": "Bonnyrigg"
            },
            {
                "value": 4335,
                "label": "Bonnyrigg Heights"
            },
            {
                "value": 4337,
                "label": "Bonville"
            },
            {
                "value": 4340,
                "label": "Booker Bay"
            },
            {
                "value": 4344,
                "label": "Booragul"
            },
            {
                "value": 4346,
                "label": "Boorowa"
            },
            {
                "value": 4352,
                "label": "Bossley Park"
            },
            {
                "value": 4354,
                "label": "Botany"
            },
            {
                "value": 4355,
                "label": "Botany Bay"
            },
            {
                "value": 4359,
                "label": "Bourke"
            },
            {
                "value": 4360,
                "label": "Bourkelands"
            },
            {
                "value": 4361,
                "label": "Bow Bowing"
            },
            {
                "value": 4364,
                "label": "Bowen Mountain"
            },
            {
                "value": 4365,
                "label": "Bowenfels"
            },
            {
                "value": 4366,
                "label": "Bowral"
            },
            {
                "value": 4367,
                "label": "Bowraville"
            },
            {
                "value": 4376,
                "label": "Bradbury"
            },
            {
                "value": 4379,
                "label": "Braidwood"
            },
            {
                "value": 4382,
                "label": "Branxton"
            },
            {
                "value": 4388,
                "label": "Breakfast Point"
            },
            {
                "value": 4391,
                "label": "Brewarrina"
            },
            {
                "value": 4406,
                "label": "Brighton-Le-Sands"
            },
            {
                "value": 4408,
                "label": "Bringelly"
            },
            {
                "value": 4415,
                "label": "Broadmeadow"
            },
            {
                "value": 4420,
                "label": "Broken Hill"
            },
            {
                "value": 4421,
                "label": "Broken Hill Municipality"
            },
            {
                "value": 4423,
                "label": "Bronte"
            },
            {
                "value": 4430,
                "label": "Brookvale"
            },
            {
                "value": 4434,
                "label": "Broulee"
            },
            {
                "value": 4441,
                "label": "Brunswick Heads"
            },
            {
                "value": 4448,
                "label": "Budgewoi"
            },
            {
                "value": 4449,
                "label": "Buff Point"
            },
            {
                "value": 4450,
                "label": "Bulahdelah"
            },
            {
                "value": 4454,
                "label": "Bullaburra"
            },
            {
                "value": 4456,
                "label": "Bulli"
            },
            {
                "value": 4468,
                "label": "Bundanoon"
            },
            {
                "value": 4469,
                "label": "Bundeena"
            },
            {
                "value": 4472,
                "label": "Bungarribee"
            },
            {
                "value": 4473,
                "label": "Bungendore"
            },
            {
                "value": 4490,
                "label": "Buronga"
            },
            {
                "value": 4494,
                "label": "Burradoo"
            },
            {
                "value": 4495,
                "label": "Burraneer"
            },
            {
                "value": 4496,
                "label": "Burrill Lake"
            },
            {
                "value": 4501,
                "label": "Burwood"
            },
            {
                "value": 4503,
                "label": "Busby"
            },
            {
                "value": 4508,
                "label": "Buttaba"
            },
            {
                "value": 4509,
                "label": "Buxton"
            },
            {
                "value": 4511,
                "label": "Byron Bay"
            },
            {
                "value": 4512,
                "label": "Byron Shire"
            },
            {
                "value": 4513,
                "label": "Bywong"
            },
            {
                "value": 4514,
                "label": "Cabarita"
            },
            {
                "value": 4517,
                "label": "Cabonne"
            },
            {
                "value": 4520,
                "label": "Cabramatta"
            },
            {
                "value": 4521,
                "label": "Cabramatta West"
            },
            {
                "value": 4522,
                "label": "Caddens"
            },
            {
                "value": 4527,
                "label": "Calala"
            },
            {
                "value": 4531,
                "label": "Callaghan"
            },
            {
                "value": 4532,
                "label": "Callala Bay"
            },
            {
                "value": 4538,
                "label": "Cambewarra Village"
            },
            {
                "value": 4542,
                "label": "Cambridge Gardens"
            },
            {
                "value": 4543,
                "label": "Cambridge Park"
            },
            {
                "value": 4544,
                "label": "Camden"
            },
            {
                "value": 4545,
                "label": "Camden Haven"
            },
            {
                "value": 4547,
                "label": "Camden South"
            },
            {
                "value": 4548,
                "label": "Cameron Park"
            },
            {
                "value": 4551,
                "label": "Cammeray"
            },
            {
                "value": 4558,
                "label": "Campbelltown"
            },
            {
                "value": 4560,
                "label": "Campbelltown Municipality"
            },
            {
                "value": 4561,
                "label": "Camperdown"
            },
            {
                "value": 4563,
                "label": "Campsie"
            },
            {
                "value": 4564,
                "label": "Canada Bay"
            },
            {
                "value": 4567,
                "label": "Canley Heights"
            },
            {
                "value": 4568,
                "label": "Canley Vale"
            },
            {
                "value": 4574,
                "label": "Canowindra"
            },
            {
                "value": 4576,
                "label": "Canterbury"
            },
            {
                "value": 4577,
                "label": "Canton Beach"
            },
            {
                "value": 4585,
                "label": "Cardiff"
            },
            {
                "value": 4586,
                "label": "Cardiff Heights"
            },
            {
                "value": 4587,
                "label": "Cardiff South"
            },
            {
                "value": 4595,
                "label": "Caringbah"
            },
            {
                "value": 4596,
                "label": "Caringbah South"
            },
            {
                "value": 4598,
                "label": "Carlingford"
            },
            {
                "value": 4601,
                "label": "Carlton"
            },
            {
                "value": 4606,
                "label": "Carnes Hill"
            },
            {
                "value": 4609,
                "label": "Carramar"
            },
            {
                "value": 4612,
                "label": "Carrathool"
            },
            {
                "value": 4613,
                "label": "Carrington"
            },
            {
                "value": 4617,
                "label": "Carss Park"
            },
            {
                "value": 4618,
                "label": "Cartwright"
            },
            {
                "value": 4619,
                "label": "Carwoola"
            },
            {
                "value": 4623,
                "label": "Casino"
            },
            {
                "value": 4626,
                "label": "Castle Cove"
            },
            {
                "value": 4627,
                "label": "Castle Hill"
            },
            {
                "value": 4628,
                "label": "Castlecrag"
            },
            {
                "value": 4630,
                "label": "Castlereagh"
            },
            {
                "value": 4632,
                "label": "Casuarina"
            },
            {
                "value": 4634,
                "label": "Casula"
            },
            {
                "value": 4635,
                "label": "Catalina"
            },
            {
                "value": 4636,
                "label": "Catherine Field"
            },
            {
                "value": 4642,
                "label": "Caves Beach"
            },
            {
                "value": 4643,
                "label": "Cecil Hills"
            },
            {
                "value": 4648,
                "label": "Centennial Park"
            },
            {
                "value": 4650,
                "label": "Central Darling"
            },
            {
                "value": 4655,
                "label": "Cessnock"
            },
            {
                "value": 4657,
                "label": "Chain Valley Bay"
            },
            {
                "value": 4665,
                "label": "Charlestown"
            },
            {
                "value": 4668,
                "label": "Charmhaven"
            },
            {
                "value": 4672,
                "label": "Chatswood"
            },
            {
                "value": 4673,
                "label": "Chatswood West"
            },
            {
                "value": 4683,
                "label": "Cherrybrook"
            },
            {
                "value": 4684,
                "label": "Chester Hill"
            },
            {
                "value": 4688,
                "label": "Chifley"
            },
            {
                "value": 4693,
                "label": "Chinderah"
            },
            {
                "value": 4694,
                "label": "Chippendale"
            },
            {
                "value": 4695,
                "label": "Chipping Norton"
            },
            {
                "value": 4698,
                "label": "Chiswick"
            },
            {
                "value": 4699,
                "label": "Chittaway Bay"
            },
            {
                "value": 4712,
                "label": "City of Sydney"
            },
            {
                "value": 4719,
                "label": "Claremont Meadows"
            },
            {
                "value": 4723,
                "label": "Clarence Town"
            },
            {
                "value": 4724,
                "label": "Clarence Valley"
            },
            {
                "value": 4729,
                "label": "Claymore"
            },
            {
                "value": 4734,
                "label": "Clemton Park"
            },
            {
                "value": 4745,
                "label": "Clontarf"
            },
            {
                "value": 4746,
                "label": "Clovelly"
            },
            {
                "value": 4752,
                "label": "Coal Point"
            },
            {
                "value": 4753,
                "label": "Cobar"
            },
            {
                "value": 4754,
                "label": "Cobbitty"
            },
            {
                "value": 4763,
                "label": "Coffs Harbour"
            },
            {
                "value": 4768,
                "label": "Coleambally"
            },
            {
                "value": 4769,
                "label": "Colebee"
            },
            {
                "value": 4770,
                "label": "Coledale"
            },
            {
                "value": 4771,
                "label": "Collaroy"
            },
            {
                "value": 4772,
                "label": "Collaroy Plateau"
            },
            {
                "value": 4779,
                "label": "Colo Vale"
            },
            {
                "value": 4781,
                "label": "Colyton"
            },
            {
                "value": 4782,
                "label": "Como"
            },
            {
                "value": 4784,
                "label": "Concord"
            },
            {
                "value": 4785,
                "label": "Concord West"
            },
            {
                "value": 4786,
                "label": "Condell Park"
            },
            {
                "value": 4788,
                "label": "Condobolin"
            },
            {
                "value": 4790,
                "label": "Coniston"
            },
            {
                "value": 4791,
                "label": "Connells Point"
            },
            {
                "value": 4793,
                "label": "Constitution Hill"
            },
            {
                "value": 4798,
                "label": "Coogee"
            },
            {
                "value": 4801,
                "label": "Cooks Hill"
            },
            {
                "value": 4803,
                "label": "Coolah"
            },
            {
                "value": 4804,
                "label": "Coolamon"
            },
            {
                "value": 4813,
                "label": "Cooma"
            },
            {
                "value": 4819,
                "label": "Coonabarabran"
            },
            {
                "value": 4820,
                "label": "Coonamble"
            },
            {
                "value": 4823,
                "label": "Cooranbong"
            },
            {
                "value": 4828,
                "label": "Cootamundra"
            },
            {
                "value": 4829,
                "label": "Copacabana"
            },
            {
                "value": 4832,
                "label": "Coraki"
            },
            {
                "value": 4835,
                "label": "Cordeaux Heights"
            },
            {
                "value": 4837,
                "label": "Corindi Beach"
            },
            {
                "value": 4839,
                "label": "Corlette"
            },
            {
                "value": 4842,
                "label": "Corowa"
            },
            {
                "value": 4844,
                "label": "Corrimal"
            },
            {
                "value": 4849,
                "label": "Coutts Crossing"
            },
            {
                "value": 4854,
                "label": "Cowra"
            },
            {
                "value": 4871,
                "label": "Cranebrook"
            },
            {
                "value": 4875,
                "label": "Cremorne"
            },
            {
                "value": 4876,
                "label": "Cremorne Point"
            },
            {
                "value": 4877,
                "label": "Crescent Head"
            },
            {
                "value": 4880,
                "label": "Crestwood"
            },
            {
                "value": 4883,
                "label": "Cringila"
            },
            {
                "value": 4884,
                "label": "Cromer"
            },
            {
                "value": 4885,
                "label": "Cronulla"
            },
            {
                "value": 4886,
                "label": "Crookwell"
            },
            {
                "value": 4887,
                "label": "Crows Nest"
            },
            {
                "value": 4889,
                "label": "Croydon"
            },
            {
                "value": 4899,
                "label": "Culburra Beach"
            },
            {
                "value": 4900,
                "label": "Culcairn"
            },
            {
                "value": 4901,
                "label": "Cumbalum"
            },
            {
                "value": 4904,
                "label": "Cundletown"
            },
            {
                "value": 4906,
                "label": "Curl Curl"
            },
            {
                "value": 4910,
                "label": "Currans Hill"
            },
            {
                "value": 4918,
                "label": "Daceyville"
            },
            {
                "value": 4925,
                "label": "Dalmeny"
            },
            {
                "value": 4933,
                "label": "Dapto"
            },
            {
                "value": 4940,
                "label": "Darling Point"
            },
            {
                "value": 4941,
                "label": "Darlinghurst"
            },
            {
                "value": 4944,
                "label": "Darlington"
            },
            {
                "value": 4945,
                "label": "Darlington Point"
            },
            {
                "value": 4948,
                "label": "Davidson"
            },
            {
                "value": 4949,
                "label": "Davistown"
            },
            {
                "value": 4958,
                "label": "Dean Park"
            },
            {
                "value": 4960,
                "label": "Dee Why"
            },
            {
                "value": 4969,
                "label": "Denham Court"
            },
            {
                "value": 4970,
                "label": "Deniliquin"
            },
            {
                "value": 4971,
                "label": "Denistone"
            },
            {
                "value": 4972,
                "label": "Denistone East"
            },
            {
                "value": 4973,
                "label": "Denman"
            },
            {
                "value": 4985,
                "label": "Dharruk"
            },
            {
                "value": 5000,
                "label": "Dolls Point"
            },
            {
                "value": 5011,
                "label": "Doonside"
            },
            {
                "value": 5012,
                "label": "Dora Creek"
            },
            {
                "value": 5014,
                "label": "Dorrigo"
            },
            {
                "value": 5016,
                "label": "Double Bay"
            },
            {
                "value": 5019,
                "label": "Douglas Park"
            },
            {
                "value": 5021,
                "label": "Dover Heights"
            },
            {
                "value": 5031,
                "label": "Drummoyne"
            },
            {
                "value": 5033,
                "label": "Dubbo"
            },
            {
                "value": 5034,
                "label": "Dudley"
            },
            {
                "value": 5038,
                "label": "Dulwich Hill"
            },
            {
                "value": 5042,
                "label": "Dundas Valley"
            },
            {
                "value": 5044,
                "label": "Dunedoo"
            },
            {
                "value": 5045,
                "label": "Dungog"
            },
            {
                "value": 5050,
                "label": "Dural"
            },
            {
                "value": 5056,
                "label": "Eagle Vale"
            },
            {
                "value": 5061,
                "label": "Earlwood"
            },
            {
                "value": 5062,
                "label": "East Albury"
            },
            {
                "value": 5065,
                "label": "East Ballina"
            },
            {
                "value": 5067,
                "label": "East Branxton"
            },
            {
                "value": 5072,
                "label": "East Corrimal"
            },
            {
                "value": 5077,
                "label": "East Gosford"
            },
            {
                "value": 5078,
                "label": "East Hills"
            },
            {
                "value": 5081,
                "label": "East Jindabyne"
            },
            {
                "value": 5082,
                "label": "East Kempsey"
            },
            {
                "value": 5083,
                "label": "East Killara"
            },
            {
                "value": 5084,
                "label": "East Kurrajong"
            },
            {
                "value": 5086,
                "label": "East Lindfield"
            },
            {
                "value": 5087,
                "label": "East Lismore"
            },
            {
                "value": 5089,
                "label": "East Maitland"
            },
            {
                "value": 5093,
                "label": "East Ryde"
            },
            {
                "value": 5095,
                "label": "East Tamworth"
            },
            {
                "value": 5099,
                "label": "Eastlakes"
            },
            {
                "value": 5100,
                "label": "Eastwood"
            },
            {
                "value": 5105,
                "label": "Eden"
            },
            {
                "value": 5110,
                "label": "Edensor Park"
            },
            {
                "value": 5112,
                "label": "Edgecliff"
            },
            {
                "value": 5114,
                "label": "Edgeworth"
            },
            {
                "value": 5116,
                "label": "Edmondson Park"
            },
            {
                "value": 5119,
                "label": "Eglinton"
            },
            {
                "value": 5124,
                "label": "Elanora Heights"
            },
            {
                "value": 5125,
                "label": "Elderslie"
            },
            {
                "value": 5126,
                "label": "Eleebana"
            },
            {
                "value": 5127,
                "label": "Elermore Vale"
            },
            {
                "value": 5130,
                "label": "Elizabeth Bay"
            },
            {
                "value": 5134,
                "label": "Elizabeth Hills"
            },
            {
                "value": 5139,
                "label": "Ellalong"
            },
            {
                "value": 5152,
                "label": "Emerald Beach"
            },
            {
                "value": 5153,
                "label": "Emerton"
            },
            {
                "value": 5154,
                "label": "Empire Bay"
            },
            {
                "value": 5155,
                "label": "Emu Heights"
            },
            {
                "value": 5157,
                "label": "Emu Plains"
            },
            {
                "value": 5161,
                "label": "Engadine"
            },
            {
                "value": 5162,
                "label": "Enmore"
            },
            {
                "value": 5165,
                "label": "Epping"
            },
            {
                "value": 5167,
                "label": "Erina"
            },
            {
                "value": 5169,
                "label": "Ermington"
            },
            {
                "value": 5171,
                "label": "Erskine Park"
            },
            {
                "value": 5172,
                "label": "Erskineville"
            },
            {
                "value": 5173,
                "label": "Eschol Park"
            },
            {
                "value": 5180,
                "label": "Estella"
            },
            {
                "value": 5183,
                "label": "Ettalong"
            },
            {
                "value": 5184,
                "label": "Ettalong Beach"
            },
            {
                "value": 5186,
                "label": "Eulomogo"
            },
            {
                "value": 5190,
                "label": "Eurobodalla"
            },
            {
                "value": 5193,
                "label": "Evans Head"
            },
            {
                "value": 5206,
                "label": "Fairfield"
            },
            {
                "value": 5208,
                "label": "Fairfield East"
            },
            {
                "value": 5209,
                "label": "Fairfield Heights"
            },
            {
                "value": 5210,
                "label": "Fairfield West"
            },
            {
                "value": 5211,
                "label": "Fairlight"
            },
            {
                "value": 5213,
                "label": "Fairy Meadow"
            },
            {
                "value": 5217,
                "label": "Farmborough Heights"
            },
            {
                "value": 5220,
                "label": "Faulconbridge"
            },
            {
                "value": 5223,
                "label": "Fennell Bay"
            },
            {
                "value": 5224,
                "label": "Fern Bay"
            },
            {
                "value": 5225,
                "label": "Fern Hill"
            },
            {
                "value": 5234,
                "label": "Figtree"
            },
            {
                "value": 5236,
                "label": "Fingal Bay"
            },
            {
                "value": 5237,
                "label": "Finley"
            },
            {
                "value": 5244,
                "label": "Five Dock"
            },
            {
                "value": 5247,
                "label": "Fletcher"
            },
            {
                "value": 5248,
                "label": "Flinders"
            },
            {
                "value": 5255,
                "label": "Floraville"
            },
            {
                "value": 5260,
                "label": "Forbes"
            },
            {
                "value": 5263,
                "label": "Forest Hill"
            },
            {
                "value": 5266,
                "label": "Forest Lodge"
            },
            {
                "value": 5269,
                "label": "Forestville"
            },
            {
                "value": 5272,
                "label": "Forresters Beach"
            },
            {
                "value": 5274,
                "label": "Forster"
            },
            {
                "value": 5286,
                "label": "Frederickton"
            },
            {
                "value": 5288,
                "label": "Freemans Reach"
            },
            {
                "value": 5290,
                "label": "Frenchs Forest"
            },
            {
                "value": 5292,
                "label": "Freshwater"
            },
            {
                "value": 5300,
                "label": "Galston"
            },
            {
                "value": 5304,
                "label": "Garden Suburb"
            },
            {
                "value": 5307,
                "label": "Gateshead"
            },
            {
                "value": 5325,
                "label": "Georges Hall"
            },
            {
                "value": 5326,
                "label": "Georgetown"
            },
            {
                "value": 5329,
                "label": "Gerringong"
            },
            {
                "value": 5332,
                "label": "Gilgandra"
            },
            {
                "value": 5335,
                "label": "Gillieston Heights"
            },
            {
                "value": 5341,
                "label": "Girards Hill"
            },
            {
                "value": 5342,
                "label": "Girraween"
            },
            {
                "value": 5346,
                "label": "Gladesville"
            },
            {
                "value": 5353,
                "label": "Glebe"
            },
            {
                "value": 5354,
                "label": "Glen Alpine"
            },
            {
                "value": 5359,
                "label": "Glen Innes"
            },
            {
                "value": 5360,
                "label": "Glen Innes Severn"
            },
            {
                "value": 5366,
                "label": "Glenbrook"
            },
            {
                "value": 5367,
                "label": "Glendale"
            },
            {
                "value": 5369,
                "label": "Glendenning"
            },
            {
                "value": 5378,
                "label": "Glenfield"
            },
            {
                "value": 5379,
                "label": "Glenfield Park"
            },
            {
                "value": 5382,
                "label": "Glenhaven"
            },
            {
                "value": 5383,
                "label": "Glenmore Park"
            },
            {
                "value": 5384,
                "label": "Glenning Valley"
            },
            {
                "value": 5386,
                "label": "Glenorie"
            },
            {
                "value": 5388,
                "label": "Glenroy"
            },
            {
                "value": 5393,
                "label": "Glenwood"
            },
            {
                "value": 5394,
                "label": "Glossodia"
            },
            {
                "value": 5395,
                "label": "Gloucester"
            },
            {
                "value": 5399,
                "label": "Gol Gol"
            },
            {
                "value": 5411,
                "label": "Googong"
            },
            {
                "value": 5416,
                "label": "Goonellabah"
            },
            {
                "value": 5418,
                "label": "Gordon"
            },
            {
                "value": 5423,
                "label": "Gorokan"
            },
            {
                "value": 5424,
                "label": "Gosford"
            },
            {
                "value": 5426,
                "label": "Goulburn"
            },
            {
                "value": 5427,
                "label": "Goulburn Mulwaree"
            },
            {
                "value": 5434,
                "label": "Grafton"
            },
            {
                "value": 5439,
                "label": "Granville"
            },
            {
                "value": 5442,
                "label": "Grasmere"
            },
            {
                "value": 5444,
                "label": "Grays Point"
            },
            {
                "value": 5448,
                "label": "Greater Hume Shire"
            },
            {
                "value": 5450,
                "label": "Green Valley"
            },
            {
                "value": 5451,
                "label": "Greenacre"
            },
            {
                "value": 5454,
                "label": "Greenfield Park"
            },
            {
                "value": 5462,
                "label": "Greenwell Point"
            },
            {
                "value": 5463,
                "label": "Greenwich"
            },
            {
                "value": 5466,
                "label": "Gregory Hills"
            },
            {
                "value": 5467,
                "label": "Grenfell"
            },
            {
                "value": 5468,
                "label": "Greta"
            },
            {
                "value": 5469,
                "label": "Greystanes"
            },
            {
                "value": 5471,
                "label": "Griffith"
            },
            {
                "value": 5473,
                "label": "Grose Vale"
            },
            {
                "value": 5476,
                "label": "Guildford West"
            },
            {
                "value": 5478,
                "label": "Gulgong"
            },
            {
                "value": 5480,
                "label": "Gulmarrad"
            },
            {
                "value": 5483,
                "label": "Gundagai"
            },
            {
                "value": 5484,
                "label": "Gundaroo"
            },
            {
                "value": 5487,
                "label": "Gunnedah"
            },
            {
                "value": 5488,
                "label": "Guyra"
            },
            {
                "value": 5489,
                "label": "Gwandalan"
            },
            {
                "value": 5491,
                "label": "Gwydir"
            },
            {
                "value": 5492,
                "label": "Gwynneville"
            },
            {
                "value": 5493,
                "label": "Gymea"
            },
            {
                "value": 5494,
                "label": "Gymea Bay"
            },
            {
                "value": 5497,
                "label": "Haberfield"
            },
            {
                "value": 5505,
                "label": "Halekulani"
            },
            {
                "value": 5512,
                "label": "Hamilton"
            },
            {
                "value": 5516,
                "label": "Hamlyn Terrace"
            },
            {
                "value": 5518,
                "label": "Hammondville"
            },
            {
                "value": 5524,
                "label": "Hanwood"
            },
            {
                "value": 5527,
                "label": "Harrington"
            },
            {
                "value": 5528,
                "label": "Harrington Park"
            },
            {
                "value": 5529,
                "label": "Harris Park"
            },
            {
                "value": 5534,
                "label": "Hassall Grove"
            },
            {
                "value": 5539,
                "label": "Hawkesbury"
            },
            {
                "value": 5540,
                "label": "Hawks Nest"
            },
            {
                "value": 5547,
                "label": "Hay"
            },
            {
                "value": 5550,
                "label": "Haymarket"
            },
            {
                "value": 5551,
                "label": "Hazelbrook"
            },
            {
                "value": 5556,
                "label": "Heathcote"
            },
            {
                "value": 5563,
                "label": "Hebersham"
            },
            {
                "value": 5564,
                "label": "Heckenberg"
            },
            {
                "value": 5566,
                "label": "Heddon Greta"
            },
            {
                "value": 5571,
                "label": "Helensburgh"
            },
            {
                "value": 5579,
                "label": "Henty"
            },
            {
                "value": 5604,
                "label": "Hill Top"
            },
            {
                "value": 5611,
                "label": "Hillsdale"
            },
            {
                "value": 5613,
                "label": "Hillston"
            },
            {
                "value": 5614,
                "label": "Hillvue"
            },
            {
                "value": 5617,
                "label": "Hinchinbrook"
            },
            {
                "value": 5623,
                "label": "Hobartville"
            },
            {
                "value": 5627,
                "label": "Holbrook"
            },
            {
                "value": 5635,
                "label": "Holmesville"
            },
            {
                "value": 5637,
                "label": "Holroyd"
            },
            {
                "value": 5638,
                "label": "Holsworthy"
            },
            {
                "value": 5642,
                "label": "Homebush"
            },
            {
                "value": 5643,
                "label": "Homebush West"
            },
            {
                "value": 5648,
                "label": "Horningsea Park"
            },
            {
                "value": 5649,
                "label": "Hornsby"
            },
            {
                "value": 5650,
                "label": "Hornsby Heights"
            },
            {
                "value": 5651,
                "label": "Hornsby Shire"
            },
            {
                "value": 5653,
                "label": "Horsley"
            },
            {
                "value": 5654,
                "label": "Horsley Park"
            },
            {
                "value": 5659,
                "label": "Howlong"
            },
            {
                "value": 5661,
                "label": "Hoxton Park"
            },
            {
                "value": 5667,
                "label": "Hunters Hill"
            },
            {
                "value": 5668,
                "label": "Hunterview"
            },
            {
                "value": 149308,
                "label": "Huntingwood"
            },
            {
                "value": 5675,
                "label": "Hurlstone Park"
            },
            {
                "value": 5677,
                "label": "Hurstville"
            },
            {
                "value": 5678,
                "label": "Hurstville Grove"
            },
            {
                "value": 5682,
                "label": "Illawong"
            },
            {
                "value": 5684,
                "label": "Iluka"
            },
            {
                "value": 5691,
                "label": "Ingleburn"
            },
            {
                "value": 5697,
                "label": "Inverell"
            },
            {
                "value": 5709,
                "label": "Islington"
            },
            {
                "value": 5716,
                "label": "Jamberoo"
            },
            {
                "value": 5719,
                "label": "Jamisontown"
            },
            {
                "value": 5724,
                "label": "Jannali"
            },
            {
                "value": 5727,
                "label": "Jerilderie"
            },
            {
                "value": 5728,
                "label": "Jerrabomberra"
            },
            {
                "value": 5730,
                "label": "Jesmond"
            },
            {
                "value": 5731,
                "label": "Jewells"
            },
            {
                "value": 5732,
                "label": "Jilliby"
            },
            {
                "value": 5734,
                "label": "Jindabyne"
            },
            {
                "value": 5737,
                "label": "Jindera"
            },
            {
                "value": 5743,
                "label": "Jordan Springs"
            },
            {
                "value": 5748,
                "label": "Junction Hill"
            },
            {
                "value": 5750,
                "label": "Junee"
            },
            {
                "value": 5754,
                "label": "Kahibah"
            },
            {
                "value": 5772,
                "label": "Kanahooka"
            },
            {
                "value": 5773,
                "label": "Kandos"
            },
            {
                "value": 5779,
                "label": "Kanwal"
            },
            {
                "value": 5780,
                "label": "Kapooka"
            },
            {
                "value": 5782,
                "label": "Karabar"
            },
            {
                "value": 5788,
                "label": "Kareela"
            },
            {
                "value": 5789,
                "label": "Kariong"
            },
            {
                "value": 5794,
                "label": "Karuah"
            },
            {
                "value": 5800,
                "label": "Katoomba"
            },
            {
                "value": 5805,
                "label": "Kearns"
            },
            {
                "value": 5812,
                "label": "Keiraville"
            },
            {
                "value": 5815,
                "label": "Kellyville"
            },
            {
                "value": 5816,
                "label": "Kellyville Ridge"
            },
            {
                "value": 5818,
                "label": "Kelso"
            },
            {
                "value": 5821,
                "label": "Kemps Creek"
            },
            {
                "value": 5822,
                "label": "Kempsey"
            },
            {
                "value": 5823,
                "label": "Kendall"
            },
            {
                "value": 5828,
                "label": "Kensington"
            },
            {
                "value": 5834,
                "label": "Kenthurst"
            },
            {
                "value": 5842,
                "label": "Kew"
            },
            {
                "value": 5848,
                "label": "Kiama"
            },
            {
                "value": 5849,
                "label": "Kiama Downs"
            },
            {
                "value": 5852,
                "label": "Kilaben Bay"
            },
            {
                "value": 5856,
                "label": "Killara"
            },
            {
                "value": 5857,
                "label": "Killarney Heights"
            },
            {
                "value": 5858,
                "label": "Killarney Vale"
            },
            {
                "value": 5864,
                "label": "King Creek"
            },
            {
                "value": 5871,
                "label": "Kings Langley"
            },
            {
                "value": 5873,
                "label": "Kings Park"
            },
            {
                "value": 5876,
                "label": "Kingscliff"
            },
            {
                "value": 5878,
                "label": "Kingsford"
            },
            {
                "value": 5879,
                "label": "Kingsgrove"
            },
            {
                "value": 5890,
                "label": "Kingswood Park"
            },
            {
                "value": 5894,
                "label": "Kirrawee"
            },
            {
                "value": 5895,
                "label": "Kirribilli"
            },
            {
                "value": 5901,
                "label": "Kogarah"
            },
            {
                "value": 5902,
                "label": "Kogarah Bay"
            },
            {
                "value": 5906,
                "label": "Koonawarra"
            },
            {
                "value": 5911,
                "label": "Kooringal"
            },
            {
                "value": 5912,
                "label": "Kootingal"
            },
            {
                "value": 5914,
                "label": "Korora"
            },
            {
                "value": 5916,
                "label": "Kosciuszko National Park"
            },
            {
                "value": 5917,
                "label": "Kotara"
            },
            {
                "value": 5918,
                "label": "Kotara South"
            },
            {
                "value": 5920,
                "label": "Ku-ring-gai"
            },
            {
                "value": 5926,
                "label": "Kurnell"
            },
            {
                "value": 5927,
                "label": "Kurraba Point"
            },
            {
                "value": 5928,
                "label": "Kurrajong Heights"
            },
            {
                "value": 5930,
                "label": "Kurri Kurri"
            },
            {
                "value": 5935,
                "label": "Kyle Bay"
            },
            {
                "value": 5937,
                "label": "Kyogle"
            },
            {
                "value": 5939,
                "label": "Lachlan"
            },
            {
                "value": 5941,
                "label": "Lake Albert"
            },
            {
                "value": 5942,
                "label": "Lake Cargelligo"
            },
            {
                "value": 5943,
                "label": "Lake Cathie"
            },
            {
                "value": 5946,
                "label": "Lake Haven"
            },
            {
                "value": 5947,
                "label": "Lake Heights"
            },
            {
                "value": 5948,
                "label": "Lake Illawarra"
            },
            {
                "value": 5950,
                "label": "Lake Macquarie Shire"
            },
            {
                "value": 5951,
                "label": "Lake Munmorah"
            },
            {
                "value": 5954,
                "label": "Lakelands"
            },
            {
                "value": 5955,
                "label": "Lakemba"
            },
            {
                "value": 5957,
                "label": "Lakewood"
            },
            {
                "value": 5959,
                "label": "Lalor Park"
            },
            {
                "value": 5960,
                "label": "Lambton"
            },
            {
                "value": 5966,
                "label": "Lane Cove"
            },
            {
                "value": 5967,
                "label": "Lane Cove North"
            },
            {
                "value": 5968,
                "label": "Lane Cove West"
            },
            {
                "value": 5973,
                "label": "Lansvale"
            },
            {
                "value": 5976,
                "label": "Largs"
            },
            {
                "value": 5990,
                "label": "Lavington"
            },
            {
                "value": 5992,
                "label": "Lawrence"
            },
            {
                "value": 5993,
                "label": "Lawson"
            },
            {
                "value": 5999,
                "label": "Leeton"
            },
            {
                "value": 6002,
                "label": "Leichhardt"
            },
            {
                "value": 6004,
                "label": "Lemon Tree Passage"
            },
            {
                "value": 6006,
                "label": "Lennox Head"
            },
            {
                "value": 6007,
                "label": "Leonay"
            },
            {
                "value": 6011,
                "label": "Leppington"
            },
            {
                "value": 6014,
                "label": "Lethbridge Park"
            },
            {
                "value": 6015,
                "label": "Leumeah"
            },
            {
                "value": 6016,
                "label": "Leura"
            },
            {
                "value": 6017,
                "label": "Lewisham"
            },
            {
                "value": 6019,
                "label": "Liberty Grove"
            },
            {
                "value": 6020,
                "label": "Lidcombe"
            },
            {
                "value": 6022,
                "label": "Lightning Ridge"
            },
            {
                "value": 6023,
                "label": "Lilli Pilli"
            },
            {
                "value": 6025,
                "label": "Lilyfield"
            },
            {
                "value": 6027,
                "label": "Lindfield"
            },
            {
                "value": 6029,
                "label": "Lisarow"
            },
            {
                "value": 6030,
                "label": "Lismore"
            },
            {
                "value": 6031,
                "label": "Lismore Heights"
            },
            {
                "value": 6032,
                "label": "Lismore Municipality"
            },
            {
                "value": 6034,
                "label": "Lithgow"
            },
            {
                "value": 6035,
                "label": "Little Bay"
            },
            {
                "value": 6040,
                "label": "Liverpool"
            },
            {
                "value": 6041,
                "label": "Liverpool Plains"
            },
            {
                "value": 6042,
                "label": "Llanarth"
            },
            {
                "value": 6043,
                "label": "Llandilo"
            },
            {
                "value": 6045,
                "label": "Lockhart"
            },
            {
                "value": 6052,
                "label": "Loftus"
            },
            {
                "value": 6060,
                "label": "Londonderry"
            },
            {
                "value": 6061,
                "label": "Long Beach"
            },
            {
                "value": 6063,
                "label": "Long Jetty"
            },
            {
                "value": 6067,
                "label": "Longueville"
            },
            {
                "value": 6069,
                "label": "Lorn"
            },
            {
                "value": 6083,
                "label": "Luddenham"
            },
            {
                "value": 6085,
                "label": "Lugarno"
            },
            {
                "value": 6086,
                "label": "Lurnea"
            },
            {
                "value": 6107,
                "label": "Macksville"
            },
            {
                "value": 6108,
                "label": "Maclean"
            },
            {
                "value": 6111,
                "label": "Macmasters Beach"
            },
            {
                "value": 6113,
                "label": "Macquarie Fields"
            },
            {
                "value": 6114,
                "label": "Macquarie Hills"
            },
            {
                "value": 6115,
                "label": "Macquarie Links"
            },
            {
                "value": 6116,
                "label": "Macquarie Park"
            },
            {
                "value": 6129,
                "label": "Maitland"
            },
            {
                "value": 6131,
                "label": "Maitland city centre"
            },
            {
                "value": 6130,
                "label": "Maitland Municipality"
            },
            {
                "value": 6132,
                "label": "Malabar"
            },
            {
                "value": 6139,
                "label": "Malua Bay"
            },
            {
                "value": 6145,
                "label": "Mangerton"
            },
            {
                "value": 6148,
                "label": "Manilla"
            },
            {
                "value": 6151,
                "label": "Manly"
            },
            {
                "value": 6152,
                "label": "Manly Vale"
            },
            {
                "value": 6154,
                "label": "Mannering Park"
            },
            {
                "value": 6169,
                "label": "Maraylya"
            },
            {
                "value": 6170,
                "label": "Marayong"
            },
            {
                "value": 6174,
                "label": "Mardi"
            },
            {
                "value": 6183,
                "label": "Marks Point"
            },
            {
                "value": 6190,
                "label": "Maroubra"
            },
            {
                "value": 6192,
                "label": "Marrickville"
            },
            {
                "value": 6194,
                "label": "Marsfield"
            },
            {
                "value": 6196,
                "label": "Marulan"
            },
            {
                "value": 6199,
                "label": "Maryland"
            },
            {
                "value": 6200,
                "label": "Maryville"
            },
            {
                "value": 6201,
                "label": "Mascot"
            },
            {
                "value": 6203,
                "label": "Matraville"
            },
            {
                "value": 6208,
                "label": "Mayfield"
            },
            {
                "value": 6209,
                "label": "Mayfield East"
            },
            {
                "value": 6210,
                "label": "Mayfield West"
            },
            {
                "value": 6216,
                "label": "McGraths Hill"
            },
            {
                "value": 6223,
                "label": "McMahons Point"
            },
            {
                "value": 6226,
                "label": "Meadowbank"
            },
            {
                "value": 6232,
                "label": "Medowie"
            },
            {
                "value": 6237,
                "label": "Melrose Park"
            },
            {
                "value": 6243,
                "label": "Menai"
            },
            {
                "value": 6244,
                "label": "Menangle"
            },
            {
                "value": 6251,
                "label": "Merewether"
            },
            {
                "value": 6252,
                "label": "Merewether Heights"
            },
            {
                "value": 6254,
                "label": "Merimbula"
            },
            {
                "value": 6261,
                "label": "Merriwa"
            },
            {
                "value": 6263,
                "label": "Merrylands"
            },
            {
                "value": 6264,
                "label": "Merrylands West"
            },
            {
                "value": 6265,
                "label": "Metford"
            },
            {
                "value": 6271,
                "label": "Mid-Western Regional"
            },
            {
                "value": 6272,
                "label": "Middle Cove"
            },
            {
                "value": 6279,
                "label": "Middleton Grange"
            },
            {
                "value": 6292,
                "label": "Miller"
            },
            {
                "value": 6293,
                "label": "Millers Point"
            },
            {
                "value": 6300,
                "label": "Millthorpe"
            },
            {
                "value": 6301,
                "label": "Milperra"
            },
            {
                "value": 6302,
                "label": "Milsons Point"
            },
            {
                "value": 6303,
                "label": "Milton"
            },
            {
                "value": 6305,
                "label": "Minchinbury"
            },
            {
                "value": 6311,
                "label": "Minto"
            },
            {
                "value": 6314,
                "label": "Miranda"
            },
            {
                "value": 6324,
                "label": "Mitchell"
            },
            {
                "value": 6327,
                "label": "Mittagong"
            },
            {
                "value": 6328,
                "label": "Moama"
            },
            {
                "value": 6339,
                "label": "Mollymook"
            },
            {
                "value": 6340,
                "label": "Mollymook Beach"
            },
            {
                "value": 6341,
                "label": "Molong"
            },
            {
                "value": 6342,
                "label": "Mona Vale"
            },
            {
                "value": 6351,
                "label": "Monterey"
            },
            {
                "value": 6360,
                "label": "Moonbi"
            },
            {
                "value": 6361,
                "label": "Moonee Beach"
            },
            {
                "value": 6370,
                "label": "Moorebank"
            },
            {
                "value": 6380,
                "label": "Moree"
            },
            {
                "value": 6381,
                "label": "Moree Plains"
            },
            {
                "value": 6384,
                "label": "Morisset"
            },
            {
                "value": 6391,
                "label": "Morpeth"
            },
            {
                "value": 6394,
                "label": "Mortdale"
            },
            {
                "value": 6396,
                "label": "Mortlake"
            },
            {
                "value": 6397,
                "label": "Moruya"
            },
            {
                "value": 6399,
                "label": "Mosman"
            },
            {
                "value": 6401,
                "label": "Moss Vale"
            },
            {
                "value": 6405,
                "label": "Mount Annan"
            },
            {
                "value": 6406,
                "label": "Mount Austin"
            },
            {
                "value": 6412,
                "label": "Mount Colah"
            },
            {
                "value": 6418,
                "label": "Mount Druitt"
            },
            {
                "value": 6428,
                "label": "Mount Hutton"
            },
            {
                "value": 6430,
                "label": "Mount Keira"
            },
            {
                "value": 6431,
                "label": "Mount Kembla"
            },
            {
                "value": 6432,
                "label": "Mount Kuring-Gai"
            },
            {
                "value": 6434,
                "label": "Mount Lewis"
            },
            {
                "value": 6448,
                "label": "Mount Ousley"
            },
            {
                "value": 6452,
                "label": "Mount Pleasant"
            },
            {
                "value": 6453,
                "label": "Mount Pritchard"
            },
            {
                "value": 6456,
                "label": "Mount Riverview"
            },
            {
                "value": 6457,
                "label": "Mount Saint Thomas"
            },
            {
                "value": 6461,
                "label": "Mount Vernon"
            },
            {
                "value": 6463,
                "label": "Mount Warrigal"
            },
            {
                "value": 6469,
                "label": "Mudgee"
            },
            {
                "value": 6475,
                "label": "Mulgoa"
            },
            {
                "value": 6478,
                "label": "Mullumbimby"
            },
            {
                "value": 6479,
                "label": "Mulwala"
            },
            {
                "value": 6498,
                "label": "Murrumbateman"
            },
            {
                "value": 6500,
                "label": "Murrurundi"
            },
            {
                "value": 6502,
                "label": "Murwillumbah"
            },
            {
                "value": 6503,
                "label": "Muswellbrook"
            },
            {
                "value": 6508,
                "label": "Nabiac"
            },
            {
                "value": 6514,
                "label": "Nambucca"
            },
            {
                "value": 6515,
                "label": "Nambucca Heads"
            },
            {
                "value": 6516,
                "label": "Nambucca Shire"
            },
            {
                "value": 6517,
                "label": "Nana Glen"
            },
            {
                "value": 6525,
                "label": "Narara"
            },
            {
                "value": 6526,
                "label": "Narellan"
            },
            {
                "value": 6527,
                "label": "Narellan Vale"
            },
            {
                "value": 6529,
                "label": "Naremburn"
            },
            {
                "value": 6530,
                "label": "Narooma"
            },
            {
                "value": 6531,
                "label": "Narrabeen"
            },
            {
                "value": 6532,
                "label": "Narrabri"
            },
            {
                "value": 6534,
                "label": "Narrandera"
            },
            {
                "value": 6535,
                "label": "Narrawallee"
            },
            {
                "value": 6536,
                "label": "Narraweena"
            },
            {
                "value": 6541,
                "label": "Narromine"
            },
            {
                "value": 6542,
                "label": "Narwee"
            },
            {
                "value": 6549,
                "label": "Nelson Bay"
            },
            {
                "value": 6553,
                "label": "Neutral Bay"
            },
            {
                "value": 6558,
                "label": "New Lambton"
            },
            {
                "value": 6559,
                "label": "New Lambton Heights"
            },
            {
                "value": 6563,
                "label": "Newcastle"
            },
            {
                "value": 6565,
                "label": "Newcastle city centre"
            },
            {
                "value": 6564,
                "label": "Newcastle East"
            },
            {
                "value": 6568,
                "label": "Newington"
            },
            {
                "value": 6572,
                "label": "Newport"
            },
            {
                "value": 6578,
                "label": "Newtown"
            },
            {
                "value": 6586,
                "label": "Niagara Park"
            },
            {
                "value": 6594,
                "label": "Nimbin"
            },
            {
                "value": 6605,
                "label": "Noraville"
            },
            {
                "value": 6609,
                "label": "Normanhurst"
            },
            {
                "value": 6613,
                "label": "North Albury"
            },
            {
                "value": 6614,
                "label": "North Avoca"
            },
            {
                "value": 6615,
                "label": "North Balgowlah"
            },
            {
                "value": 6618,
                "label": "North Boambee Valley"
            },
            {
                "value": 6619,
                "label": "North Bondi"
            },
            {
                "value": 6625,
                "label": "North Curl Curl"
            },
            {
                "value": 6626,
                "label": "North Epping"
            },
            {
                "value": 6629,
                "label": "North Gosford"
            },
            {
                "value": 6630,
                "label": "North Haven"
            },
            {
                "value": 6636,
                "label": "North Lambton"
            },
            {
                "value": 6639,
                "label": "North Manly"
            },
            {
                "value": 6641,
                "label": "North Narrabeen"
            },
            {
                "value": 6642,
                "label": "North Nowra"
            },
            {
                "value": 6643,
                "label": "North Parramatta"
            },
            {
                "value": 6646,
                "label": "North Richmond"
            },
            {
                "value": 6647,
                "label": "North Rocks"
            },
            {
                "value": 6648,
                "label": "North Ryde"
            },
            {
                "value": 6649,
                "label": "North St Marys"
            },
            {
                "value": 6650,
                "label": "North Strathfield"
            },
            {
                "value": 6651,
                "label": "North Sydney"
            },
            {
                "value": 6652,
                "label": "North Tamworth"
            },
            {
                "value": 6654,
                "label": "North Turramurra"
            },
            {
                "value": 6655,
                "label": "North Wahroonga"
            },
            {
                "value": 6658,
                "label": "North Willoughby"
            },
            {
                "value": 6659,
                "label": "North Wollongong"
            },
            {
                "value": 6663,
                "label": "Northbridge"
            },
            {
                "value": 6672,
                "label": "Northmead"
            },
            {
                "value": 6679,
                "label": "Nowra"
            },
            {
                "value": 6680,
                "label": "Nowra Hill"
            },
            {
                "value": 6689,
                "label": "Nyngan"
            },
            {
                "value": 6693,
                "label": "Oak Flats"
            },
            {
                "value": 6695,
                "label": "Oakdale"
            },
            {
                "value": 6701,
                "label": "Oakhurst"
            },
            {
                "value": 6706,
                "label": "Oakville"
            },
            {
                "value": 6707,
                "label": "Oatlands"
            },
            {
                "value": 6708,
                "label": "Oatley"
            },
            {
                "value": 6709,
                "label": "Oberon"
            },
            {
                "value": 6712,
                "label": "Ocean Shores"
            },
            {
                "value": 6714,
                "label": "Old Bar"
            },
            {
                "value": 6716,
                "label": "Old Erowal Bay"
            },
            {
                "value": 6717,
                "label": "Old Guildford"
            },
            {
                "value": 6720,
                "label": "Old Toongabbie"
            },
            {
                "value": 6729,
                "label": "Oran Park"
            },
            {
                "value": 6731,
                "label": "Orange"
            },
            {
                "value": 6732,
                "label": "Orange Municipality"
            },
            {
                "value": 6733,
                "label": "Orangeville"
            },
            {
                "value": 6735,
                "label": "Orchard Hills"
            },
            {
                "value": 6745,
                "label": "Ourimbah"
            },
            {
                "value": 6750,
                "label": "Oxley Park"
            },
            {
                "value": 6751,
                "label": "Oxley Vale"
            },
            {
                "value": 6752,
                "label": "Oyster Bay"
            },
            {
                "value": 6757,
                "label": "Paddington"
            },
            {
                "value": 6759,
                "label": "Padstow"
            },
            {
                "value": 6760,
                "label": "Padstow Heights"
            },
            {
                "value": 6762,
                "label": "Pagewood"
            },
            {
                "value": 6766,
                "label": "Palm Beach"
            },
            {
                "value": 6773,
                "label": "Panania"
            },
            {
                "value": 6794,
                "label": "Parkes"
            },
            {
                "value": 6797,
                "label": "Parklea"
            },
            {
                "value": 6805,
                "label": "Parramatta"
            },
            {
                "value": 6816,
                "label": "Peak Hill"
            },
            {
                "value": 6817,
                "label": "Peakhurst"
            },
            {
                "value": 6818,
                "label": "Peakhurst Heights"
            },
            {
                "value": 6826,
                "label": "Pemulwuy"
            },
            {
                "value": 6827,
                "label": "Pendle Hill"
            },
            {
                "value": 6829,
                "label": "Pennant Hills"
            },
            {
                "value": 6832,
                "label": "Penrith"
            },
            {
                "value": 6833,
                "label": "Penrith Municipality"
            },
            {
                "value": 6834,
                "label": "Penshurst"
            },
            {
                "value": 6844,
                "label": "Petersham"
            },
            {
                "value": 6847,
                "label": "Phillip"
            },
            {
                "value": 6853,
                "label": "Picnic Point"
            },
            {
                "value": 6854,
                "label": "Picton"
            },
            {
                "value": 6862,
                "label": "Pitt Town"
            },
            {
                "value": 6869,
                "label": "Plumpton"
            },
            {
                "value": 6872,
                "label": "Point Clare"
            },
            {
                "value": 6874,
                "label": "Point Frederick"
            },
            {
                "value": 6876,
                "label": "Point Piper"
            },
            {
                "value": 6878,
                "label": "Pokolbin"
            },
            {
                "value": 6891,
                "label": "Port Hacking"
            },
            {
                "value": 6893,
                "label": "Port Kembla"
            },
            {
                "value": 6896,
                "label": "Port Macquarie"
            },
            {
                "value": 6897,
                "label": "Port Macquarie-Hastings"
            },
            {
                "value": 6907,
                "label": "Port Stephens Shire"
            },
            {
                "value": 6910,
                "label": "Portland"
            },
            {
                "value": 6912,
                "label": "Potts Point"
            },
            {
                "value": 6913,
                "label": "Pottsville"
            },
            {
                "value": 6914,
                "label": "Pottsville Beach"
            },
            {
                "value": 6916,
                "label": "Prairiewood"
            },
            {
                "value": 6918,
                "label": "Prestons"
            },
            {
                "value": 6919,
                "label": "Primbee"
            },
            {
                "value": 6923,
                "label": "Prospect"
            },
            {
                "value": 6927,
                "label": "Punchbowl"
            },
            {
                "value": 6928,
                "label": "Putney"
            },
            {
                "value": 6929,
                "label": "Pymble"
            },
            {
                "value": 6931,
                "label": "Pyrmont"
            },
            {
                "value": 6933,
                "label": "Quakers Hill"
            },
            {
                "value": 6935,
                "label": "Queanbeyan"
            },
            {
                "value": 6936,
                "label": "Queanbeyan East"
            },
            {
                "value": 6937,
                "label": "Queanbeyan West"
            },
            {
                "value": 6939,
                "label": "Queens Park"
            },
            {
                "value": 6941,
                "label": "Queenscliff"
            },
            {
                "value": 6949,
                "label": "Quirindi"
            },
            {
                "value": 6951,
                "label": "Raby"
            },
            {
                "value": 6953,
                "label": "Raglan"
            },
            {
                "value": 6956,
                "label": "Ramsgate"
            },
            {
                "value": 6957,
                "label": "Ramsgate Beach"
            },
            {
                "value": 6958,
                "label": "Randwick"
            },
            {
                "value": 6963,
                "label": "Rankin Park"
            },
            {
                "value": 6966,
                "label": "Rathmines"
            },
            {
                "value": 6972,
                "label": "Raworth"
            },
            {
                "value": 6973,
                "label": "Raymond Terrace"
            },
            {
                "value": 6974,
                "label": "Razorback"
            },
            {
                "value": 6982,
                "label": "Redfern"
            },
            {
                "value": 6983,
                "label": "Redhead"
            },
            {
                "value": 6990,
                "label": "Regents Park"
            },
            {
                "value": 6999,
                "label": "Revesby"
            },
            {
                "value": 7000,
                "label": "Revesby Heights"
            },
            {
                "value": 7003,
                "label": "Rhodes"
            },
            {
                "value": 7006,
                "label": "Richmond"
            },
            {
                "value": 7011,
                "label": "Richmond Valley"
            },
            {
                "value": 7025,
                "label": "Riverstone"
            },
            {
                "value": 7029,
                "label": "Riverview"
            },
            {
                "value": 7030,
                "label": "Riverwood"
            },
            {
                "value": 7034,
                "label": "Robertson"
            },
            {
                "value": 7042,
                "label": "Rockdale"
            },
            {
                "value": 7048,
                "label": "Rodd Point"
            },
            {
                "value": 7055,
                "label": "Rooty Hill"
            },
            {
                "value": 7057,
                "label": "Ropes Crossing"
            },
            {
                "value": 7059,
                "label": "Rose Bay"
            },
            {
                "value": 149144,
                "label": "Rosebery"
            },
            {
                "value": 7065,
                "label": "Rosehill"
            },
            {
                "value": 7066,
                "label": "Roselands"
            },
            {
                "value": 7067,
                "label": "Rosemeadow"
            },
            {
                "value": 7071,
                "label": "Roseville"
            },
            {
                "value": 7072,
                "label": "Roseville Chase"
            },
            {
                "value": 7082,
                "label": "Rouse Hill"
            },
            {
                "value": 7088,
                "label": "Rozelle"
            },
            {
                "value": 7092,
                "label": "Ruse"
            },
            {
                "value": 7093,
                "label": "Rushcutters Bay"
            },
            {
                "value": 7096,
                "label": "Russell Lea"
            },
            {
                "value": 7097,
                "label": "Russell Vale"
            },
            {
                "value": 7098,
                "label": "Rutherford"
            },
            {
                "value": 7100,
                "label": "Rydalmere"
            },
            {
                "value": 7101,
                "label": "Ryde"
            },
            {
                "value": 7104,
                "label": "Sadleir"
            },
            {
                "value": 7112,
                "label": "Saint Ives"
            },
            {
                "value": 7116,
                "label": "Saint Peters"
            },
            {
                "value": 7117,
                "label": "Salamander Bay"
            },
            {
                "value": 7127,
                "label": "Salt Ash"
            },
            {
                "value": 7132,
                "label": "San Remo"
            },
            {
                "value": 7133,
                "label": "Sanctuary Point"
            },
            {
                "value": 7138,
                "label": "Sandringham"
            },
            {
                "value": 7142,
                "label": "Sandy Beach"
            },
            {
                "value": 7143,
                "label": "Sans Souci"
            },
            {
                "value": 7144,
                "label": "Sapphire Beach"
            },
            {
                "value": 7145,
                "label": "Saratoga"
            },
            {
                "value": 7148,
                "label": "Sawtell"
            },
            {
                "value": 7153,
                "label": "Schofields"
            },
            {
                "value": 7154,
                "label": "Scone"
            },
            {
                "value": 7167,
                "label": "Seaforth"
            },
            {
                "value": 7174,
                "label": "Sefton"
            },
            {
                "value": 7184,
                "label": "Seven Hills"
            },
            {
                "value": 7191,
                "label": "Shalvey"
            },
            {
                "value": 7198,
                "label": "Shell Cove"
            },
            {
                "value": 7200,
                "label": "Shellharbour"
            },
            {
                "value": 7201,
                "label": "Shelly Beach"
            },
            {
                "value": 7205,
                "label": "Shoal Bay"
            },
            {
                "value": 7206,
                "label": "Shoalhaven Heads"
            },
            {
                "value": 7207,
                "label": "Shoalhaven Shire"
            },
            {
                "value": 7211,
                "label": "Shortland"
            },
            {
                "value": 7215,
                "label": "Silverdale"
            },
            {
                "value": 7216,
                "label": "Silverwater"
            },
            {
                "value": 7219,
                "label": "Singleton"
            },
            {
                "value": 7220,
                "label": "Singleton Heights"
            },
            {
                "value": 7223,
                "label": "Skennars Head"
            },
            {
                "value": 7228,
                "label": "Smithfield"
            },
            {
                "value": 7230,
                "label": "Smiths Lake"
            },
            {
                "value": 7237,
                "label": "Soldiers Point"
            },
            {
                "value": 7240,
                "label": "Somersby"
            },
            {
                "value": 7249,
                "label": "South Albury"
            },
            {
                "value": 7250,
                "label": "South Bathurst"
            },
            {
                "value": 7251,
                "label": "South Bowenfels"
            },
            {
                "value": 7257,
                "label": "South Coogee"
            },
            {
                "value": 7261,
                "label": "South Grafton"
            },
            {
                "value": 7262,
                "label": "South Granville"
            },
            {
                "value": 7266,
                "label": "South Hurstville"
            },
            {
                "value": 7268,
                "label": "South Kempsey"
            },
            {
                "value": 7273,
                "label": "South Lismore"
            },
            {
                "value": 7278,
                "label": "South Murwillumbah"
            },
            {
                "value": 7279,
                "label": "South Nowra"
            },
            {
                "value": 7280,
                "label": "South Penrith"
            },
            {
                "value": 7283,
                "label": "South Tamworth"
            },
            {
                "value": 7286,
                "label": "South Turramurra"
            },
            {
                "value": 7287,
                "label": "South Wentworthville"
            },
            {
                "value": 7288,
                "label": "South West Rocks"
            },
            {
                "value": 7289,
                "label": "South Windsor"
            },
            {
                "value": 7302,
                "label": "Speers Point"
            },
            {
                "value": 7307,
                "label": "Spring Farm"
            },
            {
                "value": 7309,
                "label": "Springdale Heights"
            },
            {
                "value": 7314,
                "label": "Springvale"
            },
            {
                "value": 7317,
                "label": "Springwood"
            },
            {
                "value": 7320,
                "label": "St Andrews"
            },
            {
                "value": 7321,
                "label": "St Clair"
            },
            {
                "value": 7327,
                "label": "St Helens Park"
            },
            {
                "value": 7328,
                "label": "St Huberts Island"
            },
            {
                "value": 7329,
                "label": "St Ives Chase"
            },
            {
                "value": 7331,
                "label": "St Johns Park"
            },
            {
                "value": 7334,
                "label": "St Leonards"
            },
            {
                "value": 7338,
                "label": "St. Georges Basin"
            },
            {
                "value": 7341,
                "label": "Stanhope Gardens"
            },
            {
                "value": 7342,
                "label": "Stanmore"
            },
            {
                "value": 7344,
                "label": "Stanwell Park"
            },
            {
                "value": 7350,
                "label": "Stockton"
            },
            {
                "value": 7359,
                "label": "Strathfield"
            },
            {
                "value": 7360,
                "label": "Strathfield South"
            },
            {
                "value": 7373,
                "label": "Suffolk Park"
            },
            {
                "value": 7374,
                "label": "Summer Hill"
            },
            {
                "value": 7376,
                "label": "Summerland Point"
            },
            {
                "value": 7385,
                "label": "Sunshine Bay"
            },
            {
                "value": 7392,
                "label": "Surfside"
            },
            {
                "value": 7395,
                "label": "Surry Hills"
            },
            {
                "value": 7396,
                "label": "Sussex Inlet"
            },
            {
                "value": 7397,
                "label": "Sutherland"
            },
            {
                "value": 7398,
                "label": "Sutherland Shire"
            },
            {
                "value": 7399,
                "label": "Sutton"
            },
            {
                "value": 7405,
                "label": "Swansea"
            },
            {
                "value": 7407,
                "label": "Sydenham"
            },
            {
                "value": 7408,
                "label": "Sydney"
            },
            {
                "value": 7409,
                "label": "Sydney Central Business District"
            },
            {
                "value": 7410,
                "label": "Sydney Olympic Park"
            },
            {
                "value": 7411,
                "label": "Sylvania"
            },
            {
                "value": 7412,
                "label": "Sylvania Waters"
            },
            {
                "value": 7413,
                "label": "Table Top"
            },
            {
                "value": 7414,
                "label": "Tahmoor"
            },
            {
                "value": 7421,
                "label": "Tamarama"
            },
            {
                "value": 7425,
                "label": "Tamworth"
            },
            {
                "value": 7426,
                "label": "Tamworth Municipality"
            },
            {
                "value": 7429,
                "label": "Tanilba Bay"
            },
            {
                "value": 7437,
                "label": "Taree"
            },
            {
                "value": 7438,
                "label": "Taren Point"
            },
            {
                "value": 7443,
                "label": "Tarrawanna"
            },
            {
                "value": 7444,
                "label": "Tarro"
            },
            {
                "value": 7445,
                "label": "Tascott"
            },
            {
                "value": 7447,
                "label": "Tathra"
            },
            {
                "value": 7449,
                "label": "Tatton"
            },
            {
                "value": 7453,
                "label": "Tea Gardens"
            },
            {
                "value": 7457,
                "label": "Telarah"
            },
            {
                "value": 7460,
                "label": "Telopea"
            },
            {
                "value": 7461,
                "label": "Temora"
            },
            {
                "value": 7462,
                "label": "Temora Municipality"
            },
            {
                "value": 7463,
                "label": "Tempe"
            },
            {
                "value": 7466,
                "label": "Tenambit"
            },
            {
                "value": 7470,
                "label": "Tennyson Point"
            },
            {
                "value": 7471,
                "label": "Tenterfield"
            },
            {
                "value": 7472,
                "label": "Tenterfield Municipality"
            },
            {
                "value": 7473,
                "label": "Teralba"
            },
            {
                "value": 7475,
                "label": "Terranora"
            },
            {
                "value": 7476,
                "label": "Terrigal"
            },
            {
                "value": 7477,
                "label": "Terry Hills"
            },
            {
                "value": 7482,
                "label": "The Entrance"
            },
            {
                "value": 7483,
                "label": "The Entrance North"
            },
            {
                "value": 7487,
                "label": "The Hill"
            },
            {
                "value": 7488,
                "label": "The Hills Shire"
            },
            {
                "value": 7489,
                "label": "The Junction"
            },
            {
                "value": 7490,
                "label": "The Oaks"
            },
            {
                "value": 7492,
                "label": "The Ponds"
            },
            {
                "value": 7494,
                "label": "The Rock"
            },
            {
                "value": 7495,
                "label": "The Rocks"
            },
            {
                "value": 7499,
                "label": "Thirlmere"
            },
            {
                "value": 7500,
                "label": "Thirroul"
            },
            {
                "value": 7506,
                "label": "Thornleigh"
            },
            {
                "value": 7508,
                "label": "Thornton"
            },
            {
                "value": 7510,
                "label": "Thurgoona"
            },
            {
                "value": 7513,
                "label": "Tighes Hill"
            },
            {
                "value": 7518,
                "label": "Tingira Heights"
            },
            {
                "value": 7519,
                "label": "Tinonee"
            },
            {
                "value": 7523,
                "label": "Tocumwal"
            },
            {
                "value": 7525,
                "label": "Tolland"
            },
            {
                "value": 7527,
                "label": "Tomakin"
            },
            {
                "value": 7528,
                "label": "Tomerong"
            },
            {
                "value": 7533,
                "label": "Toongabbie"
            },
            {
                "value": 7537,
                "label": "Toormina"
            },
            {
                "value": 7541,
                "label": "Toronto"
            },
            {
                "value": 7549,
                "label": "Toukley"
            },
            {
                "value": 7553,
                "label": "Towradgi"
            },
            {
                "value": 7555,
                "label": "Trangie"
            },
            {
                "value": 7561,
                "label": "Tregear"
            },
            {
                "value": 7572,
                "label": "Tuggerawong"
            },
            {
                "value": 7576,
                "label": "Tumbarumba"
            },
            {
                "value": 7577,
                "label": "Tumbi Vmbi"
            },
            {
                "value": 7579,
                "label": "Tumut"
            },
            {
                "value": 7580,
                "label": "Tuncurry"
            },
            {
                "value": 7581,
                "label": "Tura Beach"
            },
            {
                "value": 7584,
                "label": "Tuross Head"
            },
            {
                "value": 7585,
                "label": "Turramurra"
            },
            {
                "value": 7586,
                "label": "Turrella"
            },
            {
                "value": 7587,
                "label": "Turvey Park"
            },
            {
                "value": 7589,
                "label": "Tweed"
            },
            {
                "value": 7590,
                "label": "Tweed Heads"
            },
            {
                "value": 7591,
                "label": "Tweed Heads South"
            },
            {
                "value": 7592,
                "label": "Tweed Heads West"
            },
            {
                "value": 7597,
                "label": "Ulladulla"
            },
            {
                "value": 7598,
                "label": "Ultimo"
            },
            {
                "value": 7600,
                "label": "Umina Beach"
            },
            {
                "value": 7601,
                "label": "Unanderra"
            },
            {
                "value": 7610,
                "label": "Upper Hunter Shire"
            },
            {
                "value": 7612,
                "label": "Upper Lachlan Shire"
            },
            {
                "value": 7615,
                "label": "Uralla"
            },
            {
                "value": 7618,
                "label": "Urunga"
            },
            {
                "value": 7622,
                "label": "Valentine"
            },
            {
                "value": 7623,
                "label": "Valla Beach"
            },
            {
                "value": 7624,
                "label": "Valley Heights"
            },
            {
                "value": 7628,
                "label": "Vaucluse"
            },
            {
                "value": 7637,
                "label": "Villawood"
            },
            {
                "value": 7640,
                "label": "Vincentia"
            },
            {
                "value": 7641,
                "label": "Vineyard"
            },
            {
                "value": 7646,
                "label": "Voyager Point"
            },
            {
                "value": 7648,
                "label": "Wadalba"
            },
            {
                "value": 7652,
                "label": "Wagga Wagga"
            },
            {
                "value": 7656,
                "label": "Wahroonga"
            },
            {
                "value": 7659,
                "label": "Waitara"
            },
            {
                "value": 7661,
                "label": "Wakeley"
            },
            {
                "value": 7663,
                "label": "Walcha"
            },
            {
                "value": 7664,
                "label": "Walgett"
            },
            {
                "value": 7669,
                "label": "Wallacia"
            },
            {
                "value": 7670,
                "label": "Wallalong"
            },
            {
                "value": 7673,
                "label": "Wallerawang"
            },
            {
                "value": 7676,
                "label": "Wallsend"
            },
            {
                "value": 7677,
                "label": "Wamberal"
            },
            {
                "value": 7678,
                "label": "Wamboin"
            },
            {
                "value": 7689,
                "label": "Wangi Wangi"
            },
            {
                "value": 7696,
                "label": "Warabrook"
            },
            {
                "value": 7699,
                "label": "Waratah"
            },
            {
                "value": 7700,
                "label": "Waratah West"
            },
            {
                "value": 7703,
                "label": "Wareemba"
            },
            {
                "value": 7704,
                "label": "Warialda"
            },
            {
                "value": 7705,
                "label": "Warilla"
            },
            {
                "value": 7708,
                "label": "Warners Bay"
            },
            {
                "value": 7712,
                "label": "Warragamba"
            },
            {
                "value": 7717,
                "label": "Warrawee"
            },
            {
                "value": 7718,
                "label": "Warrawong"
            },
            {
                "value": 7719,
                "label": "Warren"
            },
            {
                "value": 7720,
                "label": "Warren Shire"
            },
            {
                "value": 7721,
                "label": "Warriewood"
            },
            {
                "value": 7722,
                "label": "Warrimoo"
            },
            {
                "value": 7724,
                "label": "Warrumbungle Shire"
            },
            {
                "value": 7727,
                "label": "Warwick Farm"
            },
            {
                "value": 7728,
                "label": "Watanobbi"
            },
            {
                "value": 7733,
                "label": "Waterview Heights"
            },
            {
                "value": 7738,
                "label": "Wattle Grove"
            },
            {
                "value": 7741,
                "label": "Wattle Ponds"
            },
            {
                "value": 7744,
                "label": "Wauchope"
            },
            {
                "value": 7747,
                "label": "Waverley"
            },
            {
                "value": 7749,
                "label": "Waverton"
            },
            {
                "value": 7751,
                "label": "Weddin"
            },
            {
                "value": 7752,
                "label": "Wee Waa"
            },
            {
                "value": 7758,
                "label": "Wellington"
            },
            {
                "value": 7763,
                "label": "Wentworth"
            },
            {
                "value": 7764,
                "label": "Wentworth Falls"
            },
            {
                "value": 7765,
                "label": "Wentworth Point"
            },
            {
                "value": 7766,
                "label": "Wentworthville"
            },
            {
                "value": 7769,
                "label": "Werrington"
            },
            {
                "value": 7770,
                "label": "Werrington County"
            },
            {
                "value": 7771,
                "label": "Werrington Downs"
            },
            {
                "value": 7772,
                "label": "Werris Creek"
            },
            {
                "value": 7774,
                "label": "West Albury"
            },
            {
                "value": 7777,
                "label": "West Ballina"
            },
            {
                "value": 7778,
                "label": "West Bathurst"
            },
            {
                "value": 7787,
                "label": "West Gosford"
            },
            {
                "value": 7788,
                "label": "West Haven"
            },
            {
                "value": 7791,
                "label": "West Hoxton"
            },
            {
                "value": 7792,
                "label": "West Kempsey"
            },
            {
                "value": 7801,
                "label": "West Nowra"
            },
            {
                "value": 7802,
                "label": "West Pennant Hills"
            },
            {
                "value": 7804,
                "label": "West Pymble"
            },
            {
                "value": 7806,
                "label": "West Ryde"
            },
            {
                "value": 7808,
                "label": "West Tamworth"
            },
            {
                "value": 7810,
                "label": "West Wallsend"
            },
            {
                "value": 7813,
                "label": "West Wollongong"
            },
            {
                "value": 7815,
                "label": "West Wyalong"
            },
            {
                "value": 7820,
                "label": "Westdale"
            },
            {
                "value": 7823,
                "label": "Westleigh"
            },
            {
                "value": 7824,
                "label": "Westmead"
            },
            {
                "value": 7829,
                "label": "Wetherill Park"
            },
            {
                "value": 7830,
                "label": "Whalan"
            },
            {
                "value": 149216,
                "label": "Whale Beach"
            },
            {
                "value": 7831,
                "label": "Wheeler Heights"
            },
            {
                "value": 7836,
                "label": "Whitebridge"
            },
            {
                "value": 7849,
                "label": "Wickham"
            },
            {
                "value": 7851,
                "label": "Wilberforce"
            },
            {
                "value": 7852,
                "label": "Wiley Park"
            },
            {
                "value": 7861,
                "label": "Williamtown"
            },
            {
                "value": 7862,
                "label": "Willmot"
            },
            {
                "value": 7863,
                "label": "Willoughby"
            },
            {
                "value": 7864,
                "label": "Willoughby East"
            },
            {
                "value": 7872,
                "label": "Wilton"
            },
            {
                "value": 7875,
                "label": "Windale"
            },
            {
                "value": 7876,
                "label": "Windang"
            },
            {
                "value": 7878,
                "label": "Windradyne"
            },
            {
                "value": 7881,
                "label": "Windsor"
            },
            {
                "value": 7882,
                "label": "Windsor Downs"
            },
            {
                "value": 7884,
                "label": "Wingecarribee"
            },
            {
                "value": 7885,
                "label": "Wingham"
            },
            {
                "value": 7886,
                "label": "Winmalee"
            },
            {
                "value": 7888,
                "label": "Winston Hills"
            },
            {
                "value": 7897,
                "label": "Wolli Creek"
            },
            {
                "value": 7898,
                "label": "Wollondilly"
            },
            {
                "value": 7899,
                "label": "Wollongbar"
            },
            {
                "value": 7900,
                "label": "Wollongong"
            },
            {
                "value": 7901,
                "label": "Wollongong city centre"
            },
            {
                "value": 7902,
                "label": "Wollstonecraft"
            },
            {
                "value": 7912,
                "label": "Woodberry"
            },
            {
                "value": 7913,
                "label": "Woodbine"
            },
            {
                "value": 7916,
                "label": "Woodcroft"
            },
            {
                "value": 7920,
                "label": "Woodford"
            },
            {
                "value": 7922,
                "label": "Woodpark"
            },
            {
                "value": 7924,
                "label": "Woodrising"
            },
            {
                "value": 7935,
                "label": "Woolgoolga"
            },
            {
                "value": 7936,
                "label": "Woollahra"
            },
            {
                "value": 7937,
                "label": "Woolloomooloo"
            },
            {
                "value": 7939,
                "label": "Woolooware"
            },
            {
                "value": 7942,
                "label": "Woongarrah"
            },
            {
                "value": 7943,
                "label": "Woonona"
            },
            {
                "value": 7951,
                "label": "Woronora"
            },
            {
                "value": 7952,
                "label": "Woronora Heights"
            },
            {
                "value": 7953,
                "label": "Worrigee"
            },
            {
                "value": 7954,
                "label": "Woy Woy"
            },
            {
                "value": 7967,
                "label": "Wyee"
            },
            {
                "value": 7968,
                "label": "Wyee Point"
            },
            {
                "value": 7976,
                "label": "Wyoming"
            },
            {
                "value": 7977,
                "label": "Wyong"
            },
            {
                "value": 7978,
                "label": "Wyongah"
            },
            {
                "value": 7981,
                "label": "Yagoona"
            },
            {
                "value": 149145,
                "label": "Yallah"
            },
            {
                "value": 7989,
                "label": "Yamba"
            },
            {
                "value": 8006,
                "label": "Yarravel"
            },
            {
                "value": 8008,
                "label": "Yarrawarrah"
            },
            {
                "value": 8011,
                "label": "Yass"
            },
            {
                "value": 8012,
                "label": "Yass Valley"
            },
            {
                "value": 8016,
                "label": "Yenda"
            },
            {
                "value": 8017,
                "label": "Yennora"
            },
            {
                "value": 8021,
                "label": "Yerrinbool"
            },
            {
                "value": 8024,
                "label": "Yoogali"
            },
            {
                "value": 8028,
                "label": "Young"
            },
            {
                "value": 8030,
                "label": "Yowie Bay"
            },
            {
                "value": 8033,
                "label": "Zetland"
            }
        ]
    },
    {stateCode: "NT",
        city: [
            {
                "value": 3928,
                "label": "Alawa"
            },
            {
                "value": 3957,
                "label": "Alice Springs"
            },
            {
                "value": 3973,
                "label": "Alyangula"
            },
            {
                "value": 3989,
                "label": "Anula"
            },
            {
                "value": 3993,
                "label": "Araluen"
            },
            {
                "value": 4067,
                "label": "Bakewell"
            },
            {
                "value": 4121,
                "label": "Barkly"
            },
            {
                "value": 4194,
                "label": "Bellamack"
            },
            {
                "value": 4215,
                "label": "Belyuen"
            },
            {
                "value": 4241,
                "label": "Berrimah"
            },
            {
                "value": 4380,
                "label": "Braitling"
            },
            {
                "value": 4409,
                "label": "Brinkin"
            },
            {
                "value": 4651,
                "label": "Central Desert"
            },
            {
                "value": 4761,
                "label": "Coconut Grove"
            },
            {
                "value": 4814,
                "label": "Coomalie"
            },
            {
                "value": 4846,
                "label": "Cossack"
            },
            {
                "value": 4947,
                "label": "Darwin"
            },
            {
                "value": 4982,
                "label": "Desert Springs"
            },
            {
                "value": 5027,
                "label": "Driver"
            },
            {
                "value": 5048,
                "label": "Durack"
            },
            {
                "value": 5063,
                "label": "East Arnhem"
            },
            {
                "value": 5094,
                "label": "East Side"
            },
            {
                "value": 5216,
                "label": "Fannie Bay"
            },
            {
                "value": 5218,
                "label": "Farrar"
            },
            {
                "value": 5299,
                "label": "Galiwinku"
            },
            {
                "value": 5333,
                "label": "Gillen"
            },
            {
                "value": 5343,
                "label": "Girraween"
            },
            {
                "value": 5443,
                "label": "Gray"
            },
            {
                "value": 5482,
                "label": "Gunbalanya"
            },
            {
                "value": 5486,
                "label": "Gunn"
            },
            {
                "value": 5581,
                "label": "Herbert"
            },
            {
                "value": 5640,
                "label": "Holtze"
            },
            {
                "value": 5658,
                "label": "Howard Springs"
            },
            {
                "value": 5666,
                "label": "Humpty Doo"
            },
            {
                "value": 5712,
                "label": "Jabiru"
            },
            {
                "value": 5738,
                "label": "Jingili"
            },
            {
                "value": 5739,
                "label": "Johnston"
            },
            {
                "value": 5784,
                "label": "Karama"
            },
            {
                "value": 5797,
                "label": "Katherine"
            },
            {
                "value": 5798,
                "label": "Katherine East"
            },
            {
                "value": 5799,
                "label": "Katherine South"
            },
            {
                "value": 5975,
                "label": "Larapinta"
            },
            {
                "value": 5979,
                "label": "Larrakeyah"
            },
            {
                "value": 5995,
                "label": "Leanyer"
            },
            {
                "value": 6033,
                "label": "Litchfield"
            },
            {
                "value": 6084,
                "label": "Ludmilla"
            },
            {
                "value": 6094,
                "label": "Lyons"
            },
            {
                "value": 6096,
                "label": "MacDonnell"
            },
            {
                "value": 6133,
                "label": "Malak"
            },
            {
                "value": 6149,
                "label": "Maningrida"
            },
            {
                "value": 6191,
                "label": "Marrara"
            },
            {
                "value": 6287,
                "label": "Milingimbi"
            },
            {
                "value": 6297,
                "label": "Millner"
            },
            {
                "value": 6336,
                "label": "Moil"
            },
            {
                "value": 6403,
                "label": "Moulden"
            },
            {
                "value": 6472,
                "label": "Muirhead"
            },
            {
                "value": 6512,
                "label": "Nakara"
            },
            {
                "value": 6582,
                "label": "Ngukurr"
            },
            {
                "value": 6585,
                "label": "Nhulunbuy"
            },
            {
                "value": 6592,
                "label": "Nightcliff"
            },
            {
                "value": 6769,
                "label": "Palmerston"
            },
            {
                "value": 6784,
                "label": "Parap"
            },
            {
                "value": 6964,
                "label": "Rapid Creek"
            },
            {
                "value": 7056,
                "label": "Roper Gulf"
            },
            {
                "value": 7061,
                "label": "Rosebery"
            },
            {
                "value": 7075,
                "label": "Ross"
            },
            {
                "value": 7103,
                "label": "Sadadeen"
            },
            {
                "value": 7369,
                "label": "Stuart Park"
            },
            {
                "value": 7468,
                "label": "Tennant Creek"
            },
            {
                "value": 7485,
                "label": "The Gap"
            },
            {
                "value": 7521,
                "label": "Tiwi"
            },
            {
                "value": 7522,
                "label": "Tiwi Islands"
            },
            {
                "value": 7632,
                "label": "Victoria Daly"
            },
            {
                "value": 7643,
                "label": "Virginia"
            },
            {
                "value": 7649,
                "label": "Wadeye"
            },
            {
                "value": 7650,
                "label": "Wagait"
            },
            {
                "value": 7651,
                "label": "Wagaman"
            },
            {
                "value": 7690,
                "label": "Wanguri"
            },
            {
                "value": 7775,
                "label": "West Arnhem"
            },
            {
                "value": 7925,
                "label": "Woodroffe"
            },
            {
                "value": 7958,
                "label": "Wulagi"
            },
            {
                "value": 7963,
                "label": "Wurrumiyanga"
            },
            {
                "value": 8031,
                "label": "Yulara"
            },
            {
                "value": 8036,
                "label": "Zuccoli"
            }
        ]
    },
    {stateCode: 'QLD',
        city: [
            {
                "value": 3914,
                "label": "Acacia Ridge"
            },
            {
                "value": 3922,
                "label": "Agnes Water"
            },
            {
                "value": 3925,
                "label": "Airlie Beach"
            },
            {
                "value": 3927,
                "label": "Aitkenvale"
            },
            {
                "value": 3931,
                "label": "Albany Creek"
            },
            {
                "value": 3942,
                "label": "Alderley"
            },
            {
                "value": 3943,
                "label": "Aldershot"
            },
            {
                "value": 3948,
                "label": "Alexandra Headland"
            },
            {
                "value": 3949,
                "label": "Alexandra Hills"
            },
            {
                "value": 3955,
                "label": "Algester"
            },
            {
                "value": 3956,
                "label": "Alice River"
            },
            {
                "value": 3963,
                "label": "Allenstown"
            },
            {
                "value": 3964,
                "label": "Alligator Creek"
            },
            {
                "value": 3965,
                "label": "Allora"
            },
            {
                "value": 3969,
                "label": "Alton Downs"
            },
            {
                "value": 3977,
                "label": "Andergrove"
            },
            {
                "value": 3985,
                "label": "Annandale"
            },
            {
                "value": 3987,
                "label": "Annerley"
            },
            {
                "value": 3988,
                "label": "Anstead"
            },
            {
                "value": 3994,
                "label": "Arana Hills"
            },
            {
                "value": 4008,
                "label": "Aroona"
            },
            {
                "value": 4010,
                "label": "Arundel"
            },
            {
                "value": 4011,
                "label": "Ascot"
            },
            {
                "value": 4024,
                "label": "Ashgrove"
            },
            {
                "value": 4026,
                "label": "Ashmore"
            },
            {
                "value": 4031,
                "label": "Aspley"
            },
            {
                "value": 4034,
                "label": "Atherton"
            },
            {
                "value": 4041,
                "label": "Auchenflower"
            },
            {
                "value": 4044,
                "label": "Augustine Heights"
            },
            {
                "value": 4045,
                "label": "Aurukun"
            },
            {
                "value": 4052,
                "label": "Avenell Heights"
            },
            {
                "value": 4054,
                "label": "Avoca"
            },
            {
                "value": 4058,
                "label": "Ayr"
            },
            {
                "value": 4059,
                "label": "Babinda"
            },
            {
                "value": 4063,
                "label": "Bahrs Scrub"
            },
            {
                "value": 4065,
                "label": "Bakers Creek"
            },
            {
                "value": 4071,
                "label": "Bald Hills"
            },
            {
                "value": 4087,
                "label": "Balmoral"
            },
            {
                "value": 4089,
                "label": "Balonne Shire"
            },
            {
                "value": 4093,
                "label": "Bamaga"
            },
            {
                "value": 4094,
                "label": "Banana"
            },
            {
                "value": 4100,
                "label": "Banksia Beach"
            },
            {
                "value": 4106,
                "label": "Banyo"
            },
            {
                "value": 4110,
                "label": "Barcaldine"
            },
            {
                "value": 4111,
                "label": "Barcoo"
            },
            {
                "value": 4114,
                "label": "Bardon"
            },
            {
                "value": 4117,
                "label": "Barellan Point"
            },
            {
                "value": 4118,
                "label": "Bargara"
            },
            {
                "value": 4123,
                "label": "Barney Point"
            },
            {
                "value": 4144,
                "label": "Battery Hill"
            },
            {
                "value": 4156,
                "label": "Bayview Heights"
            },
            {
                "value": 4158,
                "label": "Beachmere"
            },
            {
                "value": 4163,
                "label": "Beaconsfield"
            },
            {
                "value": 4165,
                "label": "Beaudesert"
            },
            {
                "value": 4179,
                "label": "Beenleigh"
            },
            {
                "value": 4180,
                "label": "Beerwah"
            },
            {
                "value": 4187,
                "label": "Belgian Gardens"
            },
            {
                "value": 4196,
                "label": "Bellara"
            },
            {
                "value": 4198,
                "label": "Bellbird Park"
            },
            {
                "value": 4199,
                "label": "Bellbowrie"
            },
            {
                "value": 4206,
                "label": "Bellmere"
            },
            {
                "value": 4208,
                "label": "Belmont"
            },
            {
                "value": 4217,
                "label": "Benaraby"
            },
            {
                "value": 4221,
                "label": "Benowa"
            },
            {
                "value": 4226,
                "label": "Bentley Park"
            },
            {
                "value": 4242,
                "label": "Berrinba"
            },
            {
                "value": 4244,
                "label": "Berserker"
            },
            {
                "value": 4258,
                "label": "Biggera Waters"
            },
            {
                "value": 4261,
                "label": "Bilinga"
            },
            {
                "value": 4263,
                "label": "Biloela"
            },
            {
                "value": 4269,
                "label": "Birkdale"
            },
            {
                "value": 4273,
                "label": "Birtinya"
            },
            {
                "value": 4277,
                "label": "Black Mountain"
            },
            {
                "value": 4278,
                "label": "Black River"
            },
            {
                "value": 4280,
                "label": "Blackall"
            },
            {
                "value": 4281,
                "label": "Blackall Tambo"
            },
            {
                "value": 4290,
                "label": "Blacks Beach"
            },
            {
                "value": 4295,
                "label": "Blackwater"
            },
            {
                "value": 4305,
                "label": "Bli Bli"
            },
            {
                "value": 4311,
                "label": "Bluewater"
            },
            {
                "value": 4319,
                "label": "Bohle Plains"
            },
            {
                "value": 4320,
                "label": "Bokarina"
            },
            {
                "value": 4329,
                "label": "Bongaree"
            },
            {
                "value": 4336,
                "label": "Bonogin"
            },
            {
                "value": 4339,
                "label": "Booie"
            },
            {
                "value": 4341,
                "label": "Boonah"
            },
            {
                "value": 4342,
                "label": "Boondall"
            },
            {
                "value": 4345,
                "label": "Booral"
            },
            {
                "value": 4347,
                "label": "Booval"
            },
            {
                "value": 4350,
                "label": "Boronia Heights"
            },
            {
                "value": 4357,
                "label": "Bouldercombe"
            },
            {
                "value": 4358,
                "label": "Boulia"
            },
            {
                "value": 4362,
                "label": "Bowen"
            },
            {
                "value": 4363,
                "label": "Bowen Hills"
            },
            {
                "value": 4372,
                "label": "Boyne Island"
            },
            {
                "value": 4375,
                "label": "Bracken Ridge"
            },
            {
                "value": 4381,
                "label": "Brandon"
            },
            {
                "value": 4383,
                "label": "Branyan"
            },
            {
                "value": 4384,
                "label": "Brassall"
            },
            {
                "value": 4385,
                "label": "Bray Park"
            },
            {
                "value": 4389,
                "label": "Brendale"
            },
            {
                "value": 4394,
                "label": "Bridgeman Downs"
            },
            {
                "value": 4402,
                "label": "Brighton"
            },
            {
                "value": 4410,
                "label": "Brinsmead"
            },
            {
                "value": 4411,
                "label": "Brisbane"
            },
            {
                "value": 4412,
                "label": "Broadbeach"
            },
            {
                "value": 4413,
                "label": "Broadbeach Waters"
            },
            {
                "value": 4426,
                "label": "Brookfield"
            },
            {
                "value": 4431,
                "label": "Brookwater"
            },
            {
                "value": 4443,
                "label": "Bucasia"
            },
            {
                "value": 4444,
                "label": "Bucca"
            },
            {
                "value": 4445,
                "label": "Buccan"
            },
            {
                "value": 4446,
                "label": "Buddina"
            },
            {
                "value": 4447,
                "label": "Buderim"
            },
            {
                "value": 4452,
                "label": "Bulimba"
            },
            {
                "value": 4457,
                "label": "Bulloo"
            },
            {
                "value": 4461,
                "label": "Bundaberg"
            },
            {
                "value": 4462,
                "label": "Bundaberg East"
            },
            {
                "value": 4463,
                "label": "Bundaberg North"
            },
            {
                "value": 4464,
                "label": "Bundaberg South"
            },
            {
                "value": 4465,
                "label": "Bundaberg West"
            },
            {
                "value": 4466,
                "label": "Bundall"
            },
            {
                "value": 4467,
                "label": "Bundamba"
            },
            {
                "value": 4471,
                "label": "Bungalow"
            },
            {
                "value": 4475,
                "label": "Bunya"
            },
            {
                "value": 4477,
                "label": "Burbank"
            },
            {
                "value": 4478,
                "label": "Burdekin"
            },
            {
                "value": 4479,
                "label": "Burdell"
            },
            {
                "value": 4480,
                "label": "Burke"
            },
            {
                "value": 4481,
                "label": "Burleigh Heads"
            },
            {
                "value": 4482,
                "label": "Burleigh Waters"
            },
            {
                "value": 4483,
                "label": "Burnett Heads"
            },
            {
                "value": 4488,
                "label": "Burnside"
            },
            {
                "value": 4491,
                "label": "Burpengary"
            },
            {
                "value": 4492,
                "label": "Burpengary East"
            },
            {
                "value": 4497,
                "label": "Burrum Heads"
            },
            {
                "value": 4504,
                "label": "Bushland Beach"
            },
            {
                "value": 4515,
                "label": "Cabarlah"
            },
            {
                "value": 4518,
                "label": "Caboolture"
            },
            {
                "value": 4519,
                "label": "Caboolture South"
            },
            {
                "value": 4524,
                "label": "Cairns"
            },
            {
                "value": 4525,
                "label": "Cairns City"
            },
            {
                "value": 4526,
                "label": "Cairns North"
            },
            {
                "value": 4528,
                "label": "Calamvale"
            },
            {
                "value": 4533,
                "label": "Calliope"
            },
            {
                "value": 4534,
                "label": "Caloundra"
            },
            {
                "value": 4535,
                "label": "Caloundra West"
            },
            {
                "value": 4539,
                "label": "Cambooya"
            },
            {
                "value": 4550,
                "label": "Camira"
            },
            {
                "value": 4552,
                "label": "Camp Hill"
            },
            {
                "value": 4553,
                "label": "Camp Mountain"
            },
            {
                "value": 4572,
                "label": "Cannon Hill"
            },
            {
                "value": 4573,
                "label": "Cannonvale"
            },
            {
                "value": 4578,
                "label": "Canungra"
            },
            {
                "value": 4579,
                "label": "Capalaba"
            },
            {
                "value": 4582,
                "label": "Capella"
            },
            {
                "value": 4583,
                "label": "Caravonica"
            },
            {
                "value": 4584,
                "label": "Carbrook"
            },
            {
                "value": 4590,
                "label": "Cardwell"
            },
            {
                "value": 4592,
                "label": "Carina Heights"
            },
            {
                "value": 4593,
                "label": "Carindale"
            },
            {
                "value": 4608,
                "label": "Carpentaria"
            },
            {
                "value": 4611,
                "label": "Carrara"
            },
            {
                "value": 4616,
                "label": "Carseldine"
            },
            {
                "value": 4622,
                "label": "Cashmere"
            },
            {
                "value": 4624,
                "label": "Cassowary Coast"
            },
            {
                "value": 4644,
                "label": "Cedar Grove"
            },
            {
                "value": 4645,
                "label": "Cedar Vale"
            },
            {
                "value": 4647,
                "label": "Centenary Heights"
            },
            {
                "value": 4654,
                "label": "Central Highlands"
            },
            {
                "value": 4658,
                "label": "Chambers Flat"
            },
            {
                "value": 4660,
                "label": "Chandler"
            },
            {
                "value": 4661,
                "label": "Chapel Hill"
            },
            {
                "value": 4666,
                "label": "Charleville"
            },
            {
                "value": 4670,
                "label": "Charters Towers"
            },
            {
                "value": 4671,
                "label": "Charters Towers City"
            },
            {
                "value": 4674,
                "label": "Chatsworth"
            },
            {
                "value": 4675,
                "label": "Chelmer"
            },
            {
                "value": 4680,
                "label": "Cherbourg"
            },
            {
                "value": 4681,
                "label": "Chermside"
            },
            {
                "value": 4682,
                "label": "Chermside West"
            },
            {
                "value": 4690,
                "label": "Childers"
            },
            {
                "value": 4692,
                "label": "Chinchilla"
            },
            {
                "value": 4703,
                "label": "Churchill"
            },
            {
                "value": 4706,
                "label": "Chuwar"
            },
            {
                "value": 4728,
                "label": "Clayfield"
            },
            {
                "value": 4732,
                "label": "Clear Island Waters"
            },
            {
                "value": 4735,
                "label": "Clermont"
            },
            {
                "value": 4737,
                "label": "Cleveland"
            },
            {
                "value": 4738,
                "label": "Clifton"
            },
            {
                "value": 4739,
                "label": "Clifton Beach"
            },
            {
                "value": 4742,
                "label": "Clinton"
            },
            {
                "value": 4743,
                "label": "Cloncurry"
            },
            {
                "value": 4744,
                "label": "Clontarf"
            },
            {
                "value": 4762,
                "label": "Coes Creek"
            },
            {
                "value": 4776,
                "label": "Collingwood Park"
            },
            {
                "value": 4777,
                "label": "Collinsville"
            },
            {
                "value": 4789,
                "label": "Condon"
            },
            {
                "value": 4796,
                "label": "Cooee Bay"
            },
            {
                "value": 4800,
                "label": "Cook Shire"
            },
            {
                "value": 4802,
                "label": "Cooktown"
            },
            {
                "value": 4805,
                "label": "Coolangatta"
            },
            {
                "value": 4810,
                "label": "Cooloola Cove"
            },
            {
                "value": 4812,
                "label": "Coolum Beach"
            },
            {
                "value": 4815,
                "label": "Coombabah"
            },
            {
                "value": 4817,
                "label": "Coomera"
            },
            {
                "value": 4818,
                "label": "Coominya"
            },
            {
                "value": 4821,
                "label": "Coopers Plains"
            },
            {
                "value": 4822,
                "label": "Cooran"
            },
            {
                "value": 4824,
                "label": "Cooroibah"
            },
            {
                "value": 4826,
                "label": "Cooroy"
            },
            {
                "value": 4827,
                "label": "Coorparoo"
            },
            {
                "value": 4830,
                "label": "Coppabella"
            },
            {
                "value": 4833,
                "label": "Coral Cove"
            },
            {
                "value": 4836,
                "label": "Corinda"
            },
            {
                "value": 4840,
                "label": "Cornubia"
            },
            {
                "value": 4847,
                "label": "Cotswold Hills"
            },
            {
                "value": 4861,
                "label": "Craiglie"
            },
            {
                "value": 4863,
                "label": "Craignish"
            },
            {
                "value": 4870,
                "label": "Cranbrook"
            },
            {
                "value": 4872,
                "label": "Cranley"
            },
            {
                "value": 4879,
                "label": "Crestmead"
            },
            {
                "value": 4888,
                "label": "Crows Nest"
            },
            {
                "value": 4891,
                "label": "Croydon"
            },
            {
                "value": 4905,
                "label": "Cunnamulla"
            },
            {
                "value": 4907,
                "label": "Curra"
            },
            {
                "value": 4908,
                "label": "Currajong"
            },
            {
                "value": 4912,
                "label": "Currimundi"
            },
            {
                "value": 4913,
                "label": "Currumbin"
            },
            {
                "value": 4914,
                "label": "Currumbin Valley"
            },
            {
                "value": 4915,
                "label": "Currumbin Waters"
            },
            {
                "value": 5054,
                "label": "D’Aguilar"
            },
            {
                "value": 4920,
                "label": "Daisy Hill"
            },
            {
                "value": 4921,
                "label": "Dakabin"
            },
            {
                "value": 4922,
                "label": "Dalby"
            },
            {
                "value": 4939,
                "label": "Darling Heights"
            },
            {
                "value": 4946,
                "label": "Darra"
            },
            {
                "value": 4953,
                "label": "Dayboro"
            },
            {
                "value": 4956,
                "label": "Deagon"
            },
            {
                "value": 4959,
                "label": "Deception Bay"
            },
            {
                "value": 4961,
                "label": "Deebing Heights"
            },
            {
                "value": 4963,
                "label": "Deeragun"
            },
            {
                "value": 4966,
                "label": "Delaneys Creek"
            },
            {
                "value": 4976,
                "label": "Depot Hill"
            },
            {
                "value": 4986,
                "label": "Diamantina"
            },
            {
                "value": 4990,
                "label": "Dicky Beach"
            },
            {
                "value": 4991,
                "label": "Diddillibah"
            },
            {
                "value": 4994,
                "label": "Dimbulah"
            },
            {
                "value": 5008,
                "label": "Doolandella"
            },
            {
                "value": 5009,
                "label": "Doomadgee"
            },
            {
                "value": 5010,
                "label": "Doonan"
            },
            {
                "value": 5018,
                "label": "Douglas"
            },
            {
                "value": 5025,
                "label": "Drayton"
            },
            {
                "value": 5026,
                "label": "Drewvale"
            },
            {
                "value": 5043,
                "label": "Dundowran Beach"
            },
            {
                "value": 5049,
                "label": "Durack"
            },
            {
                "value": 5051,
                "label": "Dutton Park"
            },
            {
                "value": 5053,
                "label": "Dysart"
            },
            {
                "value": 149309,
                "label": "Eagle Farm"
            },
            {
                "value": 5057,
                "label": "Eagleby"
            },
            {
                "value": 5060,
                "label": "Earlville"
            },
            {
                "value": 5068,
                "label": "East Brisbane"
            },
            {
                "value": 5079,
                "label": "East Innisfail"
            },
            {
                "value": 5080,
                "label": "East Ipswich"
            },
            {
                "value": 5088,
                "label": "East Mackay"
            },
            {
                "value": 5096,
                "label": "East Toowoomba"
            },
            {
                "value": 5098,
                "label": "Eastern Heights"
            },
            {
                "value": 5102,
                "label": "Eatons Hill"
            },
            {
                "value": 5109,
                "label": "Edens Landing"
            },
            {
                "value": 5111,
                "label": "Edge Hill"
            },
            {
                "value": 5117,
                "label": "Edmonton"
            },
            {
                "value": 5121,
                "label": "Eight Mile Plains"
            },
            {
                "value": 5122,
                "label": "Eimeo"
            },
            {
                "value": 5123,
                "label": "Elanora"
            },
            {
                "value": 5128,
                "label": "Eli Waters"
            },
            {
                "value": 5129,
                "label": "Elimbah"
            },
            {
                "value": 5140,
                "label": "Ellen Grove"
            },
            {
                "value": 5143,
                "label": "Elliott Heads"
            },
            {
                "value": 5151,
                "label": "Emerald"
            },
            {
                "value": 5156,
                "label": "Emu Park"
            },
            {
                "value": 5163,
                "label": "Enoggera"
            },
            {
                "value": 5174,
                "label": "Esk"
            },
            {
                "value": 5182,
                "label": "Etheridge"
            },
            {
                "value": 5185,
                "label": "Eudlo"
            },
            {
                "value": 5188,
                "label": "Eumundi"
            },
            {
                "value": 5199,
                "label": "Everton Hills"
            },
            {
                "value": 5200,
                "label": "Everton Park"
            },
            {
                "value": 5207,
                "label": "Fairfield"
            },
            {
                "value": 5228,
                "label": "Fernvale"
            },
            {
                "value": 5230,
                "label": "Ferny Grove"
            },
            {
                "value": 5231,
                "label": "Ferny Hills"
            },
            {
                "value": 5233,
                "label": "Fig Tree Pocket"
            },
            {
                "value": 5240,
                "label": "Fitzgibbon"
            },
            {
                "value": 5249,
                "label": "Flinders"
            },
            {
                "value": 5253,
                "label": "Flinders View"
            },
            {
                "value": 5262,
                "label": "Forest Glen"
            },
            {
                "value": 5265,
                "label": "Forest Lake"
            },
            {
                "value": 5267,
                "label": "Forestdale"
            },
            {
                "value": 5275,
                "label": "Fortitude Valley"
            },
            {
                "value": 5285,
                "label": "Fraser Coast"
            },
            {
                "value": 5291,
                "label": "Frenchville"
            },
            {
                "value": 5293,
                "label": "Freshwater"
            },
            {
                "value": 5298,
                "label": "Gailes"
            },
            {
                "value": 5302,
                "label": "Garbutt"
            },
            {
                "value": 5308,
                "label": "Gatton"
            },
            {
                "value": 5309,
                "label": "Gaven"
            },
            {
                "value": 5313,
                "label": "Gayndah"
            },
            {
                "value": 5314,
                "label": "Gaythorne"
            },
            {
                "value": 5315,
                "label": "Geebung"
            },
            {
                "value": 5337,
                "label": "Gilston"
            },
            {
                "value": 5338,
                "label": "Gin Gin"
            },
            {
                "value": 5347,
                "label": "Gladstone"
            },
            {
                "value": 5348,
                "label": "Gladstone Central"
            },
            {
                "value": 5352,
                "label": "Glass House Mountains"
            },
            {
                "value": 5355,
                "label": "Glen Eden"
            },
            {
                "value": 5370,
                "label": "Gleneagle"
            },
            {
                "value": 5376,
                "label": "Glenella"
            },
            {
                "value": 5391,
                "label": "Glenvale"
            },
            {
                "value": 5392,
                "label": "Glenview"
            },
            {
                "value": 5400,
                "label": "Gold Coast"
            },
            {
                "value": 5402,
                "label": "Golden Beach"
            },
            {
                "value": 5407,
                "label": "Gooburrum"
            },
            {
                "value": 5408,
                "label": "Goodna"
            },
            {
                "value": 5415,
                "label": "Goondiwindi"
            },
            {
                "value": 5421,
                "label": "Gordon Park"
            },
            {
                "value": 5422,
                "label": "Gordonvale"
            },
            {
                "value": 5430,
                "label": "Gowrie Junction"
            },
            {
                "value": 5432,
                "label": "Gracemere"
            },
            {
                "value": 5433,
                "label": "Graceville"
            },
            {
                "value": 5436,
                "label": "Grange"
            },
            {
                "value": 5440,
                "label": "Granville"
            },
            {
                "value": 5453,
                "label": "Greenbank"
            },
            {
                "value": 5459,
                "label": "Greenslopes"
            },
            {
                "value": 5470,
                "label": "Griffin"
            },
            {
                "value": 5479,
                "label": "Gulliver"
            },
            {
                "value": 5481,
                "label": "Gumdale"
            },
            {
                "value": 5495,
                "label": "Gympie"
            },
            {
                "value": 5496,
                "label": "Gympie Regional Council"
            },
            {
                "value": 5513,
                "label": "Hamilton"
            },
            {
                "value": 5526,
                "label": "Harlaxton"
            },
            {
                "value": 5532,
                "label": "Harristown"
            },
            {
                "value": 5536,
                "label": "Hatton Vale"
            },
            {
                "value": 5546,
                "label": "Hawthorne"
            },
            {
                "value": 5548,
                "label": "Hay Point"
            },
            {
                "value": 5555,
                "label": "Healy"
            },
            {
                "value": 5561,
                "label": "Heathwood"
            },
            {
                "value": 5562,
                "label": "Heatley"
            },
            {
                "value": 5572,
                "label": "Helensvale"
            },
            {
                "value": 5573,
                "label": "Helidon"
            },
            {
                "value": 5574,
                "label": "Hemmant"
            },
            {
                "value": 5575,
                "label": "Hendra"
            },
            {
                "value": 5583,
                "label": "Heritage Park"
            },
            {
                "value": 5584,
                "label": "Hermit Park"
            },
            {
                "value": 5587,
                "label": "Herston"
            },
            {
                "value": 5588,
                "label": "Hervey Bay"
            },
            {
                "value": 5596,
                "label": "Highfields"
            },
            {
                "value": 5599,
                "label": "Highgate Hill"
            },
            {
                "value": 5600,
                "label": "Highland Park"
            },
            {
                "value": 5602,
                "label": "Highvale"
            },
            {
                "value": 5608,
                "label": "Hillcrest"
            },
            {
                "value": 5616,
                "label": "Hinchinbrook"
            },
            {
                "value": 5626,
                "label": "Hodgson Vale"
            },
            {
                "value": 5631,
                "label": "Holland Park"
            },
            {
                "value": 5632,
                "label": "Holland Park West"
            },
            {
                "value": 5633,
                "label": "Holloways Beach"
            },
            {
                "value": 5634,
                "label": "Hollywell"
            },
            {
                "value": 5636,
                "label": "Holmview"
            },
            {
                "value": 5641,
                "label": "Home Hill"
            },
            {
                "value": 5644,
                "label": "Hope Island"
            },
            {
                "value": 5645,
                "label": "Hope Vale"
            },
            {
                "value": 5657,
                "label": "Howard"
            },
            {
                "value": 5662,
                "label": "Hughenden"
            },
            {
                "value": 5679,
                "label": "Hyde Park"
            },
            {
                "value": 5681,
                "label": "Idalia"
            },
            {
                "value": 5685,
                "label": "Inala"
            },
            {
                "value": 5688,
                "label": "Indooroopilly"
            },
            {
                "value": 5689,
                "label": "Ingham"
            },
            {
                "value": 5694,
                "label": "Innes Park"
            },
            {
                "value": 5695,
                "label": "Innisfail"
            },
            {
                "value": 5696,
                "label": "Innisfail Estate"
            },
            {
                "value": 5702,
                "label": "Ipswich"
            },
            {
                "value": 5706,
                "label": "Isaac"
            },
            {
                "value": 5715,
                "label": "Jacobs Well"
            },
            {
                "value": 5717,
                "label": "Jamboree Heights"
            },
            {
                "value": 5722,
                "label": "Jandowae"
            },
            {
                "value": 5726,
                "label": "Jensen"
            },
            {
                "value": 5733,
                "label": "Jimboomba"
            },
            {
                "value": 5736,
                "label": "Jindalee"
            },
            {
                "value": 5745,
                "label": "Joyner"
            },
            {
                "value": 5746,
                "label": "Jubilee Pocket"
            },
            {
                "value": 5747,
                "label": "Julatten"
            },
            {
                "value": 5756,
                "label": "Kalbar"
            },
            {
                "value": 5762,
                "label": "Kalinga"
            },
            {
                "value": 5763,
                "label": "Kalkie"
            },
            {
                "value": 5764,
                "label": "Kallangur"
            },
            {
                "value": 5771,
                "label": "Kamerunga"
            },
            {
                "value": 5777,
                "label": "Kangaroo Point"
            },
            {
                "value": 5778,
                "label": "Kanimbla"
            },
            {
                "value": 5783,
                "label": "Karalee"
            },
            {
                "value": 5785,
                "label": "Karana Downs"
            },
            {
                "value": 5795,
                "label": "Karumba"
            },
            {
                "value": 5801,
                "label": "Kawana"
            },
            {
                "value": 5802,
                "label": "Kawungan"
            },
            {
                "value": 5804,
                "label": "Kearneys Spring"
            },
            {
                "value": 5806,
                "label": "Kedron"
            },
            {
                "value": 5819,
                "label": "Kelso"
            },
            {
                "value": 5820,
                "label": "Kelvin Grove"
            },
            {
                "value": 5824,
                "label": "Kenmore"
            },
            {
                "value": 5825,
                "label": "Kenmore Hills"
            },
            {
                "value": 5830,
                "label": "Kensington Grove"
            },
            {
                "value": 5837,
                "label": "Keperra"
            },
            {
                "value": 5838,
                "label": "Kepnock"
            },
            {
                "value": 5844,
                "label": "Kewarra Beach"
            },
            {
                "value": 5854,
                "label": "Kilcoy"
            },
            {
                "value": 5863,
                "label": "Kin Kora"
            },
            {
                "value": 5866,
                "label": "Kingaroy"
            },
            {
                "value": 5870,
                "label": "Kings Beach"
            },
            {
                "value": 5881,
                "label": "Kingsthorpe"
            },
            {
                "value": 5885,
                "label": "Kingston"
            },
            {
                "value": 5892,
                "label": "Kippa-Ring"
            },
            {
                "value": 5893,
                "label": "Kirkwood"
            },
            {
                "value": 5896,
                "label": "Kirwan"
            },
            {
                "value": 5897,
                "label": "Kleinton"
            },
            {
                "value": 5908,
                "label": "Koongal"
            },
            {
                "value": 5909,
                "label": "Kooralbyn"
            },
            {
                "value": 5919,
                "label": "Kowanyama"
            },
            {
                "value": 5922,
                "label": "Kuluin"
            },
            {
                "value": 5924,
                "label": "Kuraby"
            },
            {
                "value": 5925,
                "label": "Kuranda"
            },
            {
                "value": 5932,
                "label": "Kurwongbah"
            },
            {
                "value": 5938,
                "label": "Labrador"
            },
            {
                "value": 5940,
                "label": "Laidley"
            },
            {
                "value": 5949,
                "label": "Lake Macdonald"
            },
            {
                "value": 5962,
                "label": "Lammermoor"
            },
            {
                "value": 5964,
                "label": "Landsborough"
            },
            {
                "value": 5991,
                "label": "Lawnton"
            },
            {
                "value": 6001,
                "label": "Leichhardt"
            },
            {
                "value": 6038,
                "label": "Little Mountain"
            },
            {
                "value": 6046,
                "label": "Lockhart River"
            },
            {
                "value": 6050,
                "label": "Lockyer Valley"
            },
            {
                "value": 6053,
                "label": "Logan"
            },
            {
                "value": 6054,
                "label": "Logan Central"
            },
            {
                "value": 6055,
                "label": "Logan City"
            },
            {
                "value": 6056,
                "label": "Logan Reserve"
            },
            {
                "value": 6057,
                "label": "Logan Village"
            },
            {
                "value": 6058,
                "label": "Loganholme"
            },
            {
                "value": 6059,
                "label": "Loganlea"
            },
            {
                "value": 6066,
                "label": "Longreach"
            },
            {
                "value": 6071,
                "label": "Lota"
            },
            {
                "value": 6073,
                "label": "Lower Beechmont"
            },
            {
                "value": 6079,
                "label": "Lowood"
            },
            {
                "value": 6088,
                "label": "Lutwyche"
            },
            {
                "value": 6101,
                "label": "Macgregor"
            },
            {
                "value": 6103,
                "label": "Machans Beach"
            },
            {
                "value": 6104,
                "label": "Mackay"
            },
            {
                "value": 6105,
                "label": "Mackay City"
            },
            {
                "value": 6106,
                "label": "Mackenzie"
            },
            {
                "value": 6109,
                "label": "Macleay Island"
            },
            {
                "value": 6123,
                "label": "Magnetic Island"
            },
            {
                "value": 6127,
                "label": "Main Beach"
            },
            {
                "value": 6134,
                "label": "Malanda"
            },
            {
                "value": 6136,
                "label": "Maleny"
            },
            {
                "value": 6146,
                "label": "Mango Hill"
            },
            {
                "value": 6153,
                "label": "Manly West"
            },
            {
                "value": 6159,
                "label": "Manoora"
            },
            {
                "value": 6160,
                "label": "Mansfield"
            },
            {
                "value": 6163,
                "label": "Manunda"
            },
            {
                "value": 6164,
                "label": "Mapleton"
            },
            {
                "value": 6165,
                "label": "Mapoon"
            },
            {
                "value": 6168,
                "label": "Maranoa"
            },
            {
                "value": 6172,
                "label": "Marcoola"
            },
            {
                "value": 6175,
                "label": "Mareeba"
            },
            {
                "value": 6178,
                "label": "Margate"
            },
            {
                "value": 6179,
                "label": "Marian"
            },
            {
                "value": 6187,
                "label": "Maroochy River"
            },
            {
                "value": 6188,
                "label": "Maroochydore"
            },
            {
                "value": 6193,
                "label": "Marsden"
            },
            {
                "value": 6198,
                "label": "Maryborough"
            },
            {
                "value": 6204,
                "label": "Maudsland"
            },
            {
                "value": 6215,
                "label": "McDowall"
            },
            {
                "value": 6219,
                "label": "McKinlay"
            },
            {
                "value": 6227,
                "label": "Meadowbrook"
            },
            {
                "value": 6249,
                "label": "Menzies"
            },
            {
                "value": 6253,
                "label": "Meridan Plains"
            },
            {
                "value": 6255,
                "label": "Meringandan West"
            },
            {
                "value": 6256,
                "label": "Mermaid Beach"
            },
            {
                "value": 6257,
                "label": "Mermaid Waters"
            },
            {
                "value": 6260,
                "label": "Merrimac"
            },
            {
                "value": 6267,
                "label": "Miami"
            },
            {
                "value": 6274,
                "label": "Middle Park"
            },
            {
                "value": 6275,
                "label": "Middle Ridge"
            },
            {
                "value": 6277,
                "label": "Middlemount"
            },
            {
                "value": 6286,
                "label": "Miles"
            },
            {
                "value": 6290,
                "label": "Millbank"
            },
            {
                "value": 6296,
                "label": "Millmerran"
            },
            {
                "value": 6298,
                "label": "Millstream"
            },
            {
                "value": 6304,
                "label": "Milton"
            },
            {
                "value": 6307,
                "label": "Minden"
            },
            {
                "value": 6312,
                "label": "Minyama"
            },
            {
                "value": 6315,
                "label": "Mirani"
            },
            {
                "value": 6318,
                "label": "Mission Beach"
            },
            {
                "value": 6319,
                "label": "Mission River"
            },
            {
                "value": 6323,
                "label": "Mitchell"
            },
            {
                "value": 6326,
                "label": "Mitchelton"
            },
            {
                "value": 6334,
                "label": "Moffat Beach"
            },
            {
                "value": 6335,
                "label": "Moggill"
            },
            {
                "value": 6338,
                "label": "Molendinar"
            },
            {
                "value": 6347,
                "label": "Monkland"
            },
            {
                "value": 6353,
                "label": "Monto"
            },
            {
                "value": 6356,
                "label": "Montville"
            },
            {
                "value": 6358,
                "label": "Mooloolaba"
            },
            {
                "value": 6369,
                "label": "Moore Park Beach"
            },
            {
                "value": 6371,
                "label": "Mooroobool"
            },
            {
                "value": 6373,
                "label": "Moorooka"
            },
            {
                "value": 6376,
                "label": "Moranbah"
            },
            {
                "value": 6378,
                "label": "Morayfield"
            },
            {
                "value": 6383,
                "label": "Moreton Bay"
            },
            {
                "value": 6386,
                "label": "Morningside"
            },
            {
                "value": 6388,
                "label": "Mornington"
            },
            {
                "value": 6402,
                "label": "Mossman"
            },
            {
                "value": 6414,
                "label": "Mount Coolum"
            },
            {
                "value": 6415,
                "label": "Mount Cotton"
            },
            {
                "value": 6416,
                "label": "Mount Crosby"
            },
            {
                "value": 6423,
                "label": "Mount Gravatt"
            },
            {
                "value": 6424,
                "label": "Mount Gravatt East"
            },
            {
                "value": 6429,
                "label": "Mount Isa"
            },
            {
                "value": 6435,
                "label": "Mount Lofty"
            },
            {
                "value": 6436,
                "label": "Mount Louisa"
            },
            {
                "value": 6437,
                "label": "Mount Low"
            },
            {
                "value": 6443,
                "label": "Mount Morgan"
            },
            {
                "value": 6445,
                "label": "Mount Nathan"
            },
            {
                "value": 6447,
                "label": "Mount Ommaney"
            },
            {
                "value": 6451,
                "label": "Mount Pleasant"
            },
            {
                "value": 6458,
                "label": "Mount Sheridan"
            },
            {
                "value": 6462,
                "label": "Mount Warren Park"
            },
            {
                "value": 6465,
                "label": "Mountain Creek"
            },
            {
                "value": 6466,
                "label": "Moura"
            },
            {
                "value": 6470,
                "label": "Mudgeeraba"
            },
            {
                "value": 6471,
                "label": "Mudjimba"
            },
            {
                "value": 6474,
                "label": "Mulambin"
            },
            {
                "value": 6482,
                "label": "Mundingburra"
            },
            {
                "value": 6483,
                "label": "Mundoolun"
            },
            {
                "value": 6484,
                "label": "Mundubbera"
            },
            {
                "value": 6487,
                "label": "Munruben"
            },
            {
                "value": 6489,
                "label": "Murarrie"
            },
            {
                "value": 6492,
                "label": "Murgon"
            },
            {
                "value": 6494,
                "label": "Murray"
            },
            {
                "value": 6497,
                "label": "Murrumba Downs"
            },
            {
                "value": 6501,
                "label": "Murweh"
            },
            {
                "value": 6513,
                "label": "Nambour"
            },
            {
                "value": 6518,
                "label": "Nanango"
            },
            {
                "value": 6520,
                "label": "Nanum"
            },
            {
                "value": 6521,
                "label": "Napranum"
            },
            {
                "value": 6524,
                "label": "Narangba"
            },
            {
                "value": 6544,
                "label": "Nathan"
            },
            {
                "value": 6545,
                "label": "Nebo"
            },
            {
                "value": 6548,
                "label": "Nelly Bay"
            },
            {
                "value": 6550,
                "label": "Nerang"
            },
            {
                "value": 6554,
                "label": "New Auckland"
            },
            {
                "value": 6555,
                "label": "New Beith"
            },
            {
                "value": 6556,
                "label": "New Farm"
            },
            {
                "value": 6570,
                "label": "Newmarket"
            },
            {
                "value": 6574,
                "label": "Newport"
            },
            {
                "value": 6576,
                "label": "Newstead"
            },
            {
                "value": 6579,
                "label": "Newtown"
            },
            {
                "value": 6595,
                "label": "Ninderry"
            },
            {
                "value": 6596,
                "label": "Ningi"
            },
            {
                "value": 6601,
                "label": "Nome"
            },
            {
                "value": 6602,
                "label": "Noosa Heads"
            },
            {
                "value": 6603,
                "label": "Noosaville"
            },
            {
                "value": 6607,
                "label": "Norman Gardens"
            },
            {
                "value": 6608,
                "label": "Norman Park"
            },
            {
                "value": 6610,
                "label": "Normanton"
            },
            {
                "value": 6620,
                "label": "North Booval"
            },
            {
                "value": 6623,
                "label": "North Burnett"
            },
            {
                "value": 6633,
                "label": "North Ipswich"
            },
            {
                "value": 6635,
                "label": "North Lakes"
            },
            {
                "value": 6637,
                "label": "North Mackay"
            },
            {
                "value": 6638,
                "label": "North Maclean"
            },
            {
                "value": 6653,
                "label": "North Toowoomba"
            },
            {
                "value": 6656,
                "label": "North Ward"
            },
            {
                "value": 6669,
                "label": "Northern Peninsula Area"
            },
            {
                "value": 6673,
                "label": "Norville"
            },
            {
                "value": 6681,
                "label": "Nudgee"
            },
            {
                "value": 6686,
                "label": "Nundah"
            },
            {
                "value": 6698,
                "label": "Oakey"
            },
            {
                "value": 6700,
                "label": "Oakhurst"
            },
            {
                "value": 6722,
                "label": "One Mile"
            },
            {
                "value": 6727,
                "label": "Oonoonba"
            },
            {
                "value": 6728,
                "label": "Ooralea"
            },
            {
                "value": 6737,
                "label": "Ormeau"
            },
            {
                "value": 6738,
                "label": "Ormeau Hills"
            },
            {
                "value": 6739,
                "label": "Ormiston"
            },
            {
                "value": 6747,
                "label": "Oxenford"
            },
            {
                "value": 6748,
                "label": "Oxley"
            },
            {
                "value": 6754,
                "label": "Pacific Paradise"
            },
            {
                "value": 6755,
                "label": "Pacific Pines"
            },
            {
                "value": 6758,
                "label": "Paddington"
            },
            {
                "value": 6765,
                "label": "Palm Beach"
            },
            {
                "value": 6767,
                "label": "Palm Cove"
            },
            {
                "value": 6768,
                "label": "Palm Island"
            },
            {
                "value": 6771,
                "label": "Palmwoods"
            },
            {
                "value": 6781,
                "label": "Paradise Point"
            },
            {
                "value": 6786,
                "label": "Park Avenue"
            },
            {
                "value": 6790,
                "label": "Park Ridge"
            },
            {
                "value": 6791,
                "label": "Park Ridge South"
            },
            {
                "value": 6795,
                "label": "Parkhurst"
            },
            {
                "value": 6796,
                "label": "Parkinson"
            },
            {
                "value": 6798,
                "label": "Parkside"
            },
            {
                "value": 6801,
                "label": "Parkwood"
            },
            {
                "value": 6804,
                "label": "Paroo"
            },
            {
                "value": 6806,
                "label": "Parramatta Park"
            },
            {
                "value": 6807,
                "label": "Parrearra"
            },
            {
                "value": 6815,
                "label": "Peachester"
            },
            {
                "value": 6824,
                "label": "Pelican Waters"
            },
            {
                "value": 6836,
                "label": "Peregian Beach"
            },
            {
                "value": 6837,
                "label": "Peregian Springs"
            },
            {
                "value": 6845,
                "label": "Petrie"
            },
            {
                "value": 6846,
                "label": "Petrie Terrace"
            },
            {
                "value": 6850,
                "label": "Pialba"
            },
            {
                "value": 6855,
                "label": "Pie Creek"
            },
            {
                "value": 6856,
                "label": "Pimlico"
            },
            {
                "value": 6857,
                "label": "Pimpama"
            },
            {
                "value": 6858,
                "label": "Pine Mountain"
            },
            {
                "value": 6861,
                "label": "Pioneer"
            },
            {
                "value": 6863,
                "label": "Pittsworth"
            },
            {
                "value": 6864,
                "label": "Plainland"
            },
            {
                "value": 6877,
                "label": "Point Vernon"
            },
            {
                "value": 6879,
                "label": "Pomona"
            },
            {
                "value": 6881,
                "label": "Pormpuraaw"
            },
            {
                "value": 6888,
                "label": "Port Douglas"
            },
            {
                "value": 6921,
                "label": "Proserpine"
            },
            {
                "value": 6926,
                "label": "Pullenvale"
            },
            {
                "value": 6945,
                "label": "Queenton"
            },
            {
                "value": 6946,
                "label": "Quilpie"
            },
            {
                "value": 6952,
                "label": "Raceview"
            },
            {
                "value": 6954,
                "label": "Railway Estate"
            },
            {
                "value": 6955,
                "label": "Rainbow Beach"
            },
            {
                "value": 6960,
                "label": "Rangeville"
            },
            {
                "value": 6962,
                "label": "Rangewood"
            },
            {
                "value": 6965,
                "label": "Rasmussen"
            },
            {
                "value": 6968,
                "label": "Ravenshoe"
            },
            {
                "value": 6976,
                "label": "Red Hill"
            },
            {
                "value": 6979,
                "label": "Redbank"
            },
            {
                "value": 6980,
                "label": "Redbank Plains"
            },
            {
                "value": 6984,
                "label": "Redland"
            },
            {
                "value": 6985,
                "label": "Redland Bay"
            },
            {
                "value": 6986,
                "label": "Redlynch"
            },
            {
                "value": 6988,
                "label": "Reedy Creek"
            },
            {
                "value": 6989,
                "label": "Regency Downs"
            },
            {
                "value": 6991,
                "label": "Regents Park"
            },
            {
                "value": 7005,
                "label": "Richlands"
            },
            {
                "value": 7008,
                "label": "Richmond"
            },
            {
                "value": 7022,
                "label": "River Heads"
            },
            {
                "value": 7023,
                "label": "Riverhills"
            },
            {
                "value": 7028,
                "label": "Riverview"
            },
            {
                "value": 7033,
                "label": "Robertson"
            },
            {
                "value": 7035,
                "label": "Robina"
            },
            {
                "value": 7037,
                "label": "Rochedale"
            },
            {
                "value": 7038,
                "label": "Rochedale South"
            },
            {
                "value": 7043,
                "label": "Rockhampton"
            },
            {
                "value": 7046,
                "label": "Rocklea"
            },
            {
                "value": 7047,
                "label": "Rockville"
            },
            {
                "value": 7052,
                "label": "Roma"
            },
            {
                "value": 7068,
                "label": "Rosemount"
            },
            {
                "value": 7069,
                "label": "Rosenthal Heights"
            },
            {
                "value": 7074,
                "label": "Rosewood"
            },
            {
                "value": 7077,
                "label": "Rosslea"
            },
            {
                "value": 7081,
                "label": "Rothwell"
            },
            {
                "value": 7089,
                "label": "Runaway Bay"
            },
            {
                "value": 7090,
                "label": "Runcorn"
            },
            {
                "value": 7091,
                "label": "Rural View"
            },
            {
                "value": 7095,
                "label": "Russell Island"
            },
            {
                "value": 7105,
                "label": "Sadliers Crossing"
            },
            {
                "value": 7120,
                "label": "Salisbury"
            },
            {
                "value": 7129,
                "label": "Samford Valley"
            },
            {
                "value": 7135,
                "label": "Sandgate"
            },
            {
                "value": 7140,
                "label": "Sandstone Point"
            },
            {
                "value": 7146,
                "label": "Sarina"
            },
            {
                "value": 7150,
                "label": "Scarborough"
            },
            {
                "value": 7151,
                "label": "Scarness"
            },
            {
                "value": 7152,
                "label": "Scenic Rim"
            },
            {
                "value": 7183,
                "label": "Seven Hills"
            },
            {
                "value": 7186,
                "label": "Seventeen Mile Rocks"
            },
            {
                "value": 7190,
                "label": "Shailer Park"
            },
            {
                "value": 7193,
                "label": "Sharon"
            },
            {
                "value": 7197,
                "label": "Sheldon"
            },
            {
                "value": 7210,
                "label": "Shorncliffe"
            },
            {
                "value": 7212,
                "label": "Silkstone"
            },
            {
                "value": 7221,
                "label": "Sinnamon Park"
            },
            {
                "value": 7222,
                "label": "Sippy Downs"
            },
            {
                "value": 7225,
                "label": "Slacks Creek"
            },
            {
                "value": 7226,
                "label": "Slade Point"
            },
            {
                "value": 7236,
                "label": "Soldiers Hill"
            },
            {
                "value": 7241,
                "label": "Somerset"
            },
            {
                "value": 7253,
                "label": "South Brisbane"
            },
            {
                "value": 7255,
                "label": "South Burnett"
            },
            {
                "value": 7260,
                "label": "South Gladstone"
            },
            {
                "value": 7270,
                "label": "South Kolan"
            },
            {
                "value": 7274,
                "label": "South Mackay"
            },
            {
                "value": 7275,
                "label": "South Maclean"
            },
            {
                "value": 7284,
                "label": "South Toowoomba"
            },
            {
                "value": 7285,
                "label": "South Townsville"
            },
            {
                "value": 7293,
                "label": "Southern Downs"
            },
            {
                "value": 7298,
                "label": "Southport"
            },
            {
                "value": 7299,
                "label": "Southside"
            },
            {
                "value": 7308,
                "label": "Spring Hill"
            },
            {
                "value": 7310,
                "label": "Springfield"
            },
            {
                "value": 7311,
                "label": "Springfield Lakes"
            },
            {
                "value": 7312,
                "label": "Springsure"
            },
            {
                "value": 7316,
                "label": "Springwood"
            },
            {
                "value": 7322,
                "label": "St George"
            },
            {
                "value": 7339,
                "label": "Stafford"
            },
            {
                "value": 7340,
                "label": "Stafford Heights"
            },
            {
                "value": 7343,
                "label": "Stanthorpe"
            },
            {
                "value": 7364,
                "label": "Strathpine"
            },
            {
                "value": 7367,
                "label": "Stretton"
            },
            {
                "value": 7368,
                "label": "Stuart"
            },
            {
                "value": 7377,
                "label": "Sun Valley"
            },
            {
                "value": 7379,
                "label": "Sunnybank"
            },
            {
                "value": 7380,
                "label": "Sunnybank Hills"
            },
            {
                "value": 7381,
                "label": "Sunrise Beach"
            },
            {
                "value": 7382,
                "label": "Sunset"
            },
            {
                "value": 7386,
                "label": "Sunshine Beach"
            },
            {
                "value": 7387,
                "label": "Sunshine Coast"
            },
            {
                "value": 7391,
                "label": "Surfers Paradise"
            },
            {
                "value": 7400,
                "label": "Svensson Heights"
            },
            {
                "value": 7415,
                "label": "Taigum"
            },
            {
                "value": 7417,
                "label": "Tallai"
            },
            {
                "value": 7419,
                "label": "Tallebudgera"
            },
            {
                "value": 7420,
                "label": "Tallebudgera Valley"
            },
            {
                "value": 7422,
                "label": "Tamborine"
            },
            {
                "value": 7423,
                "label": "Tamborine Mountain"
            },
            {
                "value": 7427,
                "label": "Tanah Merah"
            },
            {
                "value": 7428,
                "label": "Tanawha"
            },
            {
                "value": 7430,
                "label": "Tannum Sands"
            },
            {
                "value": 7434,
                "label": "Tara"
            },
            {
                "value": 7435,
                "label": "Taranganba"
            },
            {
                "value": 7439,
                "label": "Taringa"
            },
            {
                "value": 7442,
                "label": "Tarragindi"
            },
            {
                "value": 7459,
                "label": "Telina"
            },
            {
                "value": 7467,
                "label": "Teneriffe"
            },
            {
                "value": 7478,
                "label": "Tewantin"
            },
            {
                "value": 7479,
                "label": "Thabeban"
            },
            {
                "value": 7484,
                "label": "The Gap"
            },
            {
                "value": 7486,
                "label": "The Gemfields"
            },
            {
                "value": 7493,
                "label": "The Range"
            },
            {
                "value": 7504,
                "label": "Thorneside"
            },
            {
                "value": 7505,
                "label": "Thornlands"
            },
            {
                "value": 7511,
                "label": "Thursday Island"
            },
            {
                "value": 7512,
                "label": "Tieri"
            },
            {
                "value": 7515,
                "label": "Tin Can Bay"
            },
            {
                "value": 7516,
                "label": "Tinana"
            },
            {
                "value": 7517,
                "label": "Tingalpa"
            },
            {
                "value": 7520,
                "label": "Tivoli"
            },
            {
                "value": 7524,
                "label": "Tolga"
            },
            {
                "value": 7531,
                "label": "Toogoolawah"
            },
            {
                "value": 7532,
                "label": "Toogoom"
            },
            {
                "value": 7539,
                "label": "Toowong"
            },
            {
                "value": 7540,
                "label": "Toowoomba"
            },
            {
                "value": 7542,
                "label": "Torquay"
            },
            {
                "value": 7547,
                "label": "Torres"
            },
            {
                "value": 7548,
                "label": "Torres Strait Island Region"
            },
            {
                "value": 7550,
                "label": "Townsville"
            },
            {
                "value": 7551,
                "label": "Townview"
            },
            {
                "value": 7565,
                "label": "Trinity Beach"
            },
            {
                "value": 7567,
                "label": "Trinity Park"
            },
            {
                "value": 7570,
                "label": "Trunding"
            },
            {
                "value": 7573,
                "label": "Tugun"
            },
            {
                "value": 7575,
                "label": "Tully"
            },
            {
                "value": 7593,
                "label": "Twin Waters"
            },
            {
                "value": 7603,
                "label": "Underwood"
            },
            {
                "value": 7607,
                "label": "Upper Caboolture"
            },
            {
                "value": 7608,
                "label": "Upper Coomera"
            },
            {
                "value": 7611,
                "label": "Upper Kedron"
            },
            {
                "value": 7613,
                "label": "Upper Mount Gravatt"
            },
            {
                "value": 7616,
                "label": "Urangan"
            },
            {
                "value": 7617,
                "label": "Urraween"
            },
            {
                "value": 7626,
                "label": "Varsity Lakes"
            },
            {
                "value": 7635,
                "label": "Victoria Point"
            },
            {
                "value": 7639,
                "label": "Vincent"
            },
            {
                "value": 7644,
                "label": "Virginia"
            },
            {
                "value": 7647,
                "label": "Wacol"
            },
            {
                "value": 7662,
                "label": "Wakerley"
            },
            {
                "value": 7665,
                "label": "Walkerston"
            },
            {
                "value": 7666,
                "label": "Walkervale"
            },
            {
                "value": 7675,
                "label": "Walloon"
            },
            {
                "value": 7679,
                "label": "Wamuran"
            },
            {
                "value": 7680,
                "label": "Wandal"
            },
            {
                "value": 7686,
                "label": "Wandoan"
            },
            {
                "value": 7698,
                "label": "Warana"
            },
            {
                "value": 7707,
                "label": "Warner"
            },
            {
                "value": 7725,
                "label": "Warwick"
            },
            {
                "value": 7730,
                "label": "Waterford West"
            },
            {
                "value": 7746,
                "label": "Wavell Heights"
            },
            {
                "value": 7754,
                "label": "Weipa"
            },
            {
                "value": 7756,
                "label": "Wellesley Islands"
            },
            {
                "value": 7759,
                "label": "Wellington Point"
            },
            {
                "value": 7784,
                "label": "West End"
            },
            {
                "value": 7786,
                "label": "West Gladstone"
            },
            {
                "value": 7798,
                "label": "West Mackay"
            },
            {
                "value": 7805,
                "label": "West Rockhampton"
            },
            {
                "value": 7814,
                "label": "West Woombye"
            },
            {
                "value": 7817,
                "label": "Westbrook"
            },
            {
                "value": 7819,
                "label": "Westcourt"
            },
            {
                "value": 7821,
                "label": "Western Downs"
            },
            {
                "value": 7822,
                "label": "Westlake"
            },
            {
                "value": 7835,
                "label": "White Rock"
            },
            {
                "value": 7838,
                "label": "Whitfield"
            },
            {
                "value": 7839,
                "label": "Whitsunday"
            },
            {
                "value": 7840,
                "label": "Whitsundays"
            },
            {
                "value": 7865,
                "label": "Willow Vale"
            },
            {
                "value": 7866,
                "label": "Willowbank"
            },
            {
                "value": 7869,
                "label": "Wilsonton"
            },
            {
                "value": 7870,
                "label": "Wilsonton Heights"
            },
            {
                "value": 7871,
                "label": "Wilston"
            },
            {
                "value": 7877,
                "label": "Windaroo"
            },
            {
                "value": 7880,
                "label": "Windsor"
            },
            {
                "value": 7887,
                "label": "Winston"
            },
            {
                "value": 7890,
                "label": "Winton"
            },
            {
                "value": 7891,
                "label": "Wishart"
            },
            {
                "value": 7892,
                "label": "Withcott"
            },
            {
                "value": 7894,
                "label": "Witta"
            },
            {
                "value": 7903,
                "label": "Wondai"
            },
            {
                "value": 7904,
                "label": "Wondunna"
            },
            {
                "value": 7906,
                "label": "Wongaling Beach"
            },
            {
                "value": 7908,
                "label": "Wongawallan"
            },
            {
                "value": 7918,
                "label": "Woodend"
            },
            {
                "value": 7919,
                "label": "Woodford"
            },
            {
                "value": 7921,
                "label": "Woodgate"
            },
            {
                "value": 7923,
                "label": "Woodridge"
            },
            {
                "value": 7934,
                "label": "Woody Point"
            },
            {
                "value": 7938,
                "label": "Woolloongabba"
            },
            {
                "value": 7940,
                "label": "Wooloowin"
            },
            {
                "value": 7941,
                "label": "Woombye"
            },
            {
                "value": 7944,
                "label": "Woorabinda"
            },
            {
                "value": 7946,
                "label": "Woorim"
            },
            {
                "value": 7949,
                "label": "Woree"
            },
            {
                "value": 7950,
                "label": "Worongary"
            },
            {
                "value": 7957,
                "label": "Wujal Wujal"
            },
            {
                "value": 7959,
                "label": "Wulguru"
            },
            {
                "value": 7960,
                "label": "Wulkuraka"
            },
            {
                "value": 7964,
                "label": "Wurtulla"
            },
            {
                "value": 7973,
                "label": "Wynnum"
            },
            {
                "value": 7974,
                "label": "Wynnum West"
            },
            {
                "value": 7979,
                "label": "Wyreema"
            },
            {
                "value": 7988,
                "label": "Yamanto"
            },
            {
                "value": 7991,
                "label": "Yandina"
            },
            {
                "value": 7994,
                "label": "Yaroomba"
            },
            {
                "value": 7999,
                "label": "Yarrabah"
            },
            {
                "value": 8000,
                "label": "Yarrabilba"
            },
            {
                "value": 8004,
                "label": "Yarraman"
            },
            {
                "value": 8013,
                "label": "Yatala"
            },
            {
                "value": 8015,
                "label": "Yeerongpilly"
            },
            {
                "value": 8018,
                "label": "Yeppoon"
            },
            {
                "value": 8019,
                "label": "Yeppoon city centre"
            },
            {
                "value": 8020,
                "label": "Yeronga"
            },
            {
                "value": 8027,
                "label": "Yorkeys Knob"
            },
            {
                "value": 8032,
                "label": "Yungaburra"
            },
            {
                "value": 8034,
                "label": "Zillmere"
            },
            {
                "value": 8035,
                "label": "Zilzie"
            }
        ]
    },
    {stateCode: "SA",
        city: [
            {
                "value": 3910,
                "label": "Aberfoyle Park"
            },
            {
                "value": 3919,
                "label": "Adelaide"
            },
            {
                "value": 3921,
                "label": "Adelaide city centre"
            },
            {
                "value": 3920,
                "label": "Adelaide Hills"
            },
            {
                "value": 3933,
                "label": "Albert Park"
            },
            {
                "value": 3935,
                "label": "Alberton"
            },
            {
                "value": 3944,
                "label": "Aldgate"
            },
            {
                "value": 3945,
                "label": "Aldinga Beach"
            },
            {
                "value": 3951,
                "label": "Alexandrina"
            },
            {
                "value": 3962,
                "label": "Allenby Gardens"
            },
            {
                "value": 3976,
                "label": "Anangu Pitjantjatjara"
            },
            {
                "value": 3978,
                "label": "Andrews Farm"
            },
            {
                "value": 3979,
                "label": "Angaston"
            },
            {
                "value": 3980,
                "label": "Angle Park"
            },
            {
                "value": 3981,
                "label": "Angle Vale"
            },
            {
                "value": 4001,
                "label": "Ardrossan"
            },
            {
                "value": 4014,
                "label": "Ascot Park"
            },
            {
                "value": 4023,
                "label": "Ashford"
            },
            {
                "value": 4033,
                "label": "Athelstone"
            },
            {
                "value": 4035,
                "label": "Athol Park"
            },
            {
                "value": 4069,
                "label": "Balaklava"
            },
            {
                "value": 4077,
                "label": "Balhannah"
            },
            {
                "value": 4102,
                "label": "Banksia Park"
            },
            {
                "value": 4122,
                "label": "Barmera"
            },
            {
                "value": 4126,
                "label": "Barossa"
            },
            {
                "value": 4130,
                "label": "Barunga West"
            },
            {
                "value": 4168,
                "label": "Beaumont"
            },
            {
                "value": 4173,
                "label": "Bedford Park"
            },
            {
                "value": 4183,
                "label": "Belair"
            },
            {
                "value": 4202,
                "label": "Bellevue Heights"
            },
            {
                "value": 4236,
                "label": "Berri"
            },
            {
                "value": 4237,
                "label": "Berri and Barmera"
            },
            {
                "value": 4247,
                "label": "Beulah Park"
            },
            {
                "value": 4250,
                "label": "Beverley"
            },
            {
                "value": 4268,
                "label": "Birdwood"
            },
            {
                "value": 4270,
                "label": "Birkenhead"
            },
            {
                "value": 4275,
                "label": "Black Forest"
            },
            {
                "value": 4296,
                "label": "Blackwood"
            },
            {
                "value": 4297,
                "label": "Blair Athol"
            },
            {
                "value": 4301,
                "label": "Blakeview"
            },
            {
                "value": 4348,
                "label": "Bordertown"
            },
            {
                "value": 4378,
                "label": "Brahma Lodge"
            },
            {
                "value": 4397,
                "label": "Bridgewater"
            },
            {
                "value": 4401,
                "label": "Brighton"
            },
            {
                "value": 4417,
                "label": "Broadview"
            },
            {
                "value": 4422,
                "label": "Brompton"
            },
            {
                "value": 4428,
                "label": "Brooklyn Park"
            },
            {
                "value": 4486,
                "label": "Burnside"
            },
            {
                "value": 4493,
                "label": "Burra"
            },
            {
                "value": 4499,
                "label": "Burton"
            },
            {
                "value": 4546,
                "label": "Camden Park"
            },
            {
                "value": 4559,
                "label": "Campbelltown"
            },
            {
                "value": 4646,
                "label": "Ceduna"
            },
            {
                "value": 4664,
                "label": "Charles Sturt"
            },
            {
                "value": 4678,
                "label": "Cheltenham"
            },
            {
                "value": 4701,
                "label": "Christie Downs"
            },
            {
                "value": 4702,
                "label": "Christies Beach"
            },
            {
                "value": 4713,
                "label": "City of West Torrens"
            },
            {
                "value": 4714,
                "label": "Clapham"
            },
            {
                "value": 4715,
                "label": "Clare"
            },
            {
                "value": 4716,
                "label": "Clare and Gilbert Valleys"
            },
            {
                "value": 4721,
                "label": "Clarence Gardens"
            },
            {
                "value": 4722,
                "label": "Clarence Park"
            },
            {
                "value": 4733,
                "label": "Clearview"
            },
            {
                "value": 4736,
                "label": "Cleve"
            },
            {
                "value": 4747,
                "label": "Clovelly Park"
            },
            {
                "value": 4778,
                "label": "Collinswood"
            },
            {
                "value": 4780,
                "label": "Colonel Light Gardens"
            },
            {
                "value": 4794,
                "label": "Coober Pedy"
            },
            {
                "value": 4831,
                "label": "Copper Coast"
            },
            {
                "value": 4841,
                "label": "Coromandel Valley"
            },
            {
                "value": 4850,
                "label": "Cowandilla"
            },
            {
                "value": 4852,
                "label": "Cowell"
            },
            {
                "value": 4856,
                "label": "Crafers"
            },
            {
                "value": 4857,
                "label": "Crafers West"
            },
            {
                "value": 4858,
                "label": "Craigburn Farm"
            },
            {
                "value": 4862,
                "label": "Craigmore"
            },
            {
                "value": 4894,
                "label": "Croydon Park"
            },
            {
                "value": 4896,
                "label": "Crystal Brook"
            },
            {
                "value": 4902,
                "label": "Cumberland Park"
            },
            {
                "value": 4942,
                "label": "Darlington"
            },
            {
                "value": 4950,
                "label": "Davoren Park"
            },
            {
                "value": 4951,
                "label": "Daw Park"
            },
            {
                "value": 4979,
                "label": "Dernancourt"
            },
            {
                "value": 5020,
                "label": "Dover Gardens"
            },
            {
                "value": 5037,
                "label": "Dulwich"
            },
            {
                "value": 5104,
                "label": "Echunga"
            },
            {
                "value": 5107,
                "label": "Eden Hills"
            },
            {
                "value": 5118,
                "label": "Edwardstown"
            },
            {
                "value": 5131,
                "label": "Elizabeth Downs"
            },
            {
                "value": 5132,
                "label": "Elizabeth East"
            },
            {
                "value": 5133,
                "label": "Elizabeth Grove"
            },
            {
                "value": 5135,
                "label": "Elizabeth North"
            },
            {
                "value": 5136,
                "label": "Elizabeth Park"
            },
            {
                "value": 5137,
                "label": "Elizabeth South"
            },
            {
                "value": 5138,
                "label": "Elizabeth Vale"
            },
            {
                "value": 5144,
                "label": "Elliston"
            },
            {
                "value": 5158,
                "label": "Encounter Bay"
            },
            {
                "value": 5160,
                "label": "Enfield"
            },
            {
                "value": 5168,
                "label": "Erindale"
            },
            {
                "value": 5181,
                "label": "Ethelton"
            },
            {
                "value": 5192,
                "label": "Evandale"
            },
            {
                "value": 5194,
                "label": "Evanston"
            },
            {
                "value": 5195,
                "label": "Evanston Gardens"
            },
            {
                "value": 5196,
                "label": "Evanston Park"
            },
            {
                "value": 5198,
                "label": "Everard Park"
            },
            {
                "value": 5201,
                "label": "Exeter"
            },
            {
                "value": 5212,
                "label": "Fairview Park"
            },
            {
                "value": 5222,
                "label": "Felixstow"
            },
            {
                "value": 5232,
                "label": "Ferryden Park"
            },
            {
                "value": 5235,
                "label": "Findon"
            },
            {
                "value": 5238,
                "label": "Firle"
            },
            {
                "value": 5245,
                "label": "Flagstaff Hill"
            },
            {
                "value": 5251,
                "label": "Flinders Park"
            },
            {
                "value": 5252,
                "label": "Flinders Ranges"
            },
            {
                "value": 5268,
                "label": "Forestville"
            },
            {
                "value": 5279,
                "label": "Franklin Harbour"
            },
            {
                "value": 5287,
                "label": "Freeling"
            },
            {
                "value": 5294,
                "label": "Fulham"
            },
            {
                "value": 5295,
                "label": "Fulham Gardens"
            },
            {
                "value": 5296,
                "label": "Fullarton"
            },
            {
                "value": 5310,
                "label": "Gawler"
            },
            {
                "value": 5311,
                "label": "Gawler East"
            },
            {
                "value": 5312,
                "label": "Gawler South"
            },
            {
                "value": 5331,
                "label": "Gilberton"
            },
            {
                "value": 5334,
                "label": "Gilles Plains"
            },
            {
                "value": 5351,
                "label": "Glandore"
            },
            {
                "value": 5363,
                "label": "Glen Osmond"
            },
            {
                "value": 5365,
                "label": "Glenalta"
            },
            {
                "value": 5371,
                "label": "Glenelg"
            },
            {
                "value": 5373,
                "label": "Glenelg East"
            },
            {
                "value": 5374,
                "label": "Glenelg North"
            },
            {
                "value": 5375,
                "label": "Glenelg South"
            },
            {
                "value": 5381,
                "label": "Glengowrie"
            },
            {
                "value": 5389,
                "label": "Glenside"
            },
            {
                "value": 5390,
                "label": "Glenunga"
            },
            {
                "value": 5396,
                "label": "Glynde"
            },
            {
                "value": 5403,
                "label": "Golden Grove"
            },
            {
                "value": 5410,
                "label": "Goodwood"
            },
            {
                "value": 5412,
                "label": "Goolwa"
            },
            {
                "value": 5413,
                "label": "Goolwa Beach"
            },
            {
                "value": 5431,
                "label": "Goyder"
            },
            {
                "value": 5435,
                "label": "Grange"
            },
            {
                "value": 5437,
                "label": "Grant"
            },
            {
                "value": 5452,
                "label": "Greenacres"
            },
            {
                "value": 5457,
                "label": "Greenock"
            },
            {
                "value": 5464,
                "label": "Greenwith"
            },
            {
                "value": 5477,
                "label": "Gulfview Heights"
            },
            {
                "value": 5499,
                "label": "Hackham"
            },
            {
                "value": 5500,
                "label": "Hackham West"
            },
            {
                "value": 5504,
                "label": "Hahndorf"
            },
            {
                "value": 5507,
                "label": "Hallett Cove"
            },
            {
                "value": 5519,
                "label": "Hampstead Gardens"
            },
            {
                "value": 5525,
                "label": "Happy Valley"
            },
            {
                "value": 5542,
                "label": "Hawthorn"
            },
            {
                "value": 5545,
                "label": "Hawthorndene"
            },
            {
                "value": 5549,
                "label": "Hayborough"
            },
            {
                "value": 5553,
                "label": "Hazelwood Park"
            },
            {
                "value": 5565,
                "label": "Hectorville"
            },
            {
                "value": 5576,
                "label": "Henley Beach"
            },
            {
                "value": 5577,
                "label": "Henley Beach South"
            },
            {
                "value": 5589,
                "label": "Hewett"
            },
            {
                "value": 5594,
                "label": "Highbury"
            },
            {
                "value": 5598,
                "label": "Highgate"
            },
            {
                "value": 5606,
                "label": "Hillbank"
            },
            {
                "value": 5607,
                "label": "Hillcrest"
            },
            {
                "value": 5619,
                "label": "Hindmarsh Island"
            },
            {
                "value": 5628,
                "label": "Holden Hill"
            },
            {
                "value": 5630,
                "label": "Holdfast Bay"
            },
            {
                "value": 5646,
                "label": "Hope Valley"
            },
            {
                "value": 5656,
                "label": "Hove"
            },
            {
                "value": 5669,
                "label": "Huntfield Heights"
            },
            {
                "value": 5680,
                "label": "Hyde Park"
            },
            {
                "value": 5690,
                "label": "Ingle Farm"
            },
            {
                "value": 5718,
                "label": "Jamestown"
            },
            {
                "value": 5744,
                "label": "Joslin"
            },
            {
                "value": 5753,
                "label": "Kadina"
            },
            {
                "value": 5776,
                "label": "Kangaroo Island"
            },
            {
                "value": 5781,
                "label": "Kapunda"
            },
            {
                "value": 5791,
                "label": "Karoonda East Murray"
            },
            {
                "value": 5813,
                "label": "Keith"
            },
            {
                "value": 5829,
                "label": "Kensington Gardens"
            },
            {
                "value": 5831,
                "label": "Kensington Park"
            },
            {
                "value": 5833,
                "label": "Kent Town"
            },
            {
                "value": 5840,
                "label": "Kersbrook"
            },
            {
                "value": 5851,
                "label": "Kidman Park"
            },
            {
                "value": 5853,
                "label": "Kilburn"
            },
            {
                "value": 5855,
                "label": "Kilkenny"
            },
            {
                "value": 5862,
                "label": "Kimba"
            },
            {
                "value": 5877,
                "label": "Kingscote"
            },
            {
                "value": 5883,
                "label": "Kingston"
            },
            {
                "value": 5888,
                "label": "Kingston South East"
            },
            {
                "value": 5898,
                "label": "Klemzig"
            },
            {
                "value": 5929,
                "label": "Kurralta Park"
            },
            {
                "value": 5977,
                "label": "Largs Bay"
            },
            {
                "value": 5978,
                "label": "Largs North"
            },
            {
                "value": 5994,
                "label": "Leabrook"
            },
            {
                "value": 6018,
                "label": "Lewiston"
            },
            {
                "value": 6021,
                "label": "Light"
            },
            {
                "value": 6026,
                "label": "Linden Park"
            },
            {
                "value": 6037,
                "label": "Little Hampton"
            },
            {
                "value": 6044,
                "label": "Lobethal"
            },
            {
                "value": 6047,
                "label": "Lockleys"
            },
            {
                "value": 6075,
                "label": "Lower Eyre Peninsula"
            },
            {
                "value": 6077,
                "label": "Lower Mitcham"
            },
            {
                "value": 6080,
                "label": "Loxton"
            },
            {
                "value": 6081,
                "label": "Loxton Waikerie"
            },
            {
                "value": 6090,
                "label": "Lyndoch"
            },
            {
                "value": 6098,
                "label": "Macclesfield"
            },
            {
                "value": 6122,
                "label": "Magill"
            },
            {
                "value": 6128,
                "label": "Maitland"
            },
            {
                "value": 6138,
                "label": "Mallala"
            },
            {
                "value": 6141,
                "label": "Malvern"
            },
            {
                "value": 6157,
                "label": "Manningham"
            },
            {
                "value": 6158,
                "label": "Mannum"
            },
            {
                "value": 6162,
                "label": "Mansfield Park"
            },
            {
                "value": 6166,
                "label": "Maralinga Tjarutja"
            },
            {
                "value": 6173,
                "label": "Marden"
            },
            {
                "value": 6181,
                "label": "Marino"
            },
            {
                "value": 6182,
                "label": "Marion"
            },
            {
                "value": 6184,
                "label": "Marleston"
            },
            {
                "value": 6202,
                "label": "Maslin Beach"
            },
            {
                "value": 6206,
                "label": "Mawson Lakes"
            },
            {
                "value": 6212,
                "label": "Maylands"
            },
            {
                "value": 6213,
                "label": "McCracken"
            },
            {
                "value": 6221,
                "label": "McLaren Flat"
            },
            {
                "value": 6222,
                "label": "McLaren Vale"
            },
            {
                "value": 6228,
                "label": "Meadows"
            },
            {
                "value": 6231,
                "label": "Medindie"
            },
            {
                "value": 6238,
                "label": "Melrose Park"
            },
            {
                "value": 6245,
                "label": "Meningie"
            },
            {
                "value": 6270,
                "label": "Mid Murray"
            },
            {
                "value": 6278,
                "label": "Middleton"
            },
            {
                "value": 6285,
                "label": "Mile End"
            },
            {
                "value": 6295,
                "label": "Millicent"
            },
            {
                "value": 6299,
                "label": "Millswood"
            },
            {
                "value": 6310,
                "label": "Minlaton"
            },
            {
                "value": 6321,
                "label": "Mitcham"
            },
            {
                "value": 6325,
                "label": "Mitchell Park"
            },
            {
                "value": 6329,
                "label": "Moana"
            },
            {
                "value": 6330,
                "label": "Modbury"
            },
            {
                "value": 6331,
                "label": "Modbury Heights"
            },
            {
                "value": 6332,
                "label": "Modbury North"
            },
            {
                "value": 6343,
                "label": "Monash"
            },
            {
                "value": 6364,
                "label": "Moonta Bay"
            },
            {
                "value": 6368,
                "label": "Moorak"
            },
            {
                "value": 6392,
                "label": "Morphett Vale"
            },
            {
                "value": 6393,
                "label": "Morphettville"
            },
            {
                "value": 6408,
                "label": "Mount Barker"
            },
            {
                "value": 6413,
                "label": "Mount Compass"
            },
            {
                "value": 6422,
                "label": "Mount Gambier"
            },
            {
                "value": 6454,
                "label": "Mount Remarkable"
            },
            {
                "value": 6485,
                "label": "Munno Para"
            },
            {
                "value": 6486,
                "label": "Munno Para West"
            },
            {
                "value": 6495,
                "label": "Murray Bridge"
            },
            {
                "value": 6505,
                "label": "Mylor"
            },
            {
                "value": 6506,
                "label": "Myrtle Bank"
            },
            {
                "value": 6510,
                "label": "Nailsworth"
            },
            {
                "value": 6511,
                "label": "Nairne"
            },
            {
                "value": 6522,
                "label": "Naracoorte"
            },
            {
                "value": 6523,
                "label": "Naracoorte and Lucindale"
            },
            {
                "value": 6551,
                "label": "Netherby"
            },
            {
                "value": 6552,
                "label": "Netley"
            },
            {
                "value": 6577,
                "label": "Newton"
            },
            {
                "value": 6597,
                "label": "Noarlunga Downs"
            },
            {
                "value": 6611,
                "label": "Normanville"
            },
            {
                "value": 6612,
                "label": "North Adelaide"
            },
            {
                "value": 6622,
                "label": "North Brighton"
            },
            {
                "value": 6631,
                "label": "North Haven"
            },
            {
                "value": 6645,
                "label": "North Plympton"
            },
            {
                "value": 6666,
                "label": "Northern Areas"
            },
            {
                "value": 6670,
                "label": "Northfield"
            },
            {
                "value": 6671,
                "label": "Northgate"
            },
            {
                "value": 6675,
                "label": "Norwood"
            },
            {
                "value": 6676,
                "label": "Norwood Payneham St Peters"
            },
            {
                "value": 6678,
                "label": "Novar Gardens"
            },
            {
                "value": 6688,
                "label": "Nuriootpa"
            },
            {
                "value": 6692,
                "label": "O'Sullivan Beach"
            },
            {
                "value": 6753,
                "label": "O’Halloran Hill"
            },
            {
                "value": 6696,
                "label": "Oakden"
            },
            {
                "value": 6702,
                "label": "Oaklands Park"
            },
            {
                "value": 6718,
                "label": "Old Noarlunga"
            },
            {
                "value": 6719,
                "label": "Old Reynella"
            },
            {
                "value": 6723,
                "label": "One Tree Hill"
            },
            {
                "value": 6724,
                "label": "Onkaparinga"
            },
            {
                "value": 6725,
                "label": "Onkaparinga Hills"
            },
            {
                "value": 6741,
                "label": "Orroroo/Carrieton"
            },
            {
                "value": 6742,
                "label": "Osborne"
            },
            {
                "value": 6744,
                "label": "Ottoway"
            },
            {
                "value": 6774,
                "label": "Panorama"
            },
            {
                "value": 6776,
                "label": "Para Hills"
            },
            {
                "value": 6777,
                "label": "Para Hills West"
            },
            {
                "value": 6778,
                "label": "Para Vista"
            },
            {
                "value": 6780,
                "label": "Paradise"
            },
            {
                "value": 6782,
                "label": "Parafield Gardens"
            },
            {
                "value": 6783,
                "label": "Paralowie"
            },
            {
                "value": 6785,
                "label": "Paringa"
            },
            {
                "value": 6788,
                "label": "Park Holme"
            },
            {
                "value": 6799,
                "label": "Parkside"
            },
            {
                "value": 6808,
                "label": "Pasadena"
            },
            {
                "value": 6812,
                "label": "Payneham"
            },
            {
                "value": 6813,
                "label": "Payneham South"
            },
            {
                "value": 6830,
                "label": "Pennington"
            },
            {
                "value": 6831,
                "label": "Penola"
            },
            {
                "value": 6842,
                "label": "Peterborough"
            },
            {
                "value": 6843,
                "label": "Peterhead"
            },
            {
                "value": 6866,
                "label": "Playford"
            },
            {
                "value": 6870,
                "label": "Plympton"
            },
            {
                "value": 6871,
                "label": "Plympton Park"
            },
            {
                "value": 6880,
                "label": "Pooraka"
            },
            {
                "value": 6882,
                "label": "Port Adelaide"
            },
            {
                "value": 6883,
                "label": "Port Adelaide Enfield"
            },
            {
                "value": 6884,
                "label": "Port Augusta"
            },
            {
                "value": 6885,
                "label": "Port Augusta West"
            },
            {
                "value": 6886,
                "label": "Port Broughton"
            },
            {
                "value": 6889,
                "label": "Port Elliot"
            },
            {
                "value": 6895,
                "label": "Port Lincoln"
            },
            {
                "value": 6899,
                "label": "Port Noarlunga"
            },
            {
                "value": 6900,
                "label": "Port Noarlunga South"
            },
            {
                "value": 6902,
                "label": "Port Pirie"
            },
            {
                "value": 6903,
                "label": "Port Pirie City and Dists"
            },
            {
                "value": 6904,
                "label": "Port Pirie South"
            },
            {
                "value": 6905,
                "label": "Port Pirie West"
            },
            {
                "value": 6908,
                "label": "Port Willunga"
            },
            {
                "value": 6922,
                "label": "Prospect"
            },
            {
                "value": 6944,
                "label": "Queenstown"
            },
            {
                "value": 6950,
                "label": "Quorn"
            },
            {
                "value": 6987,
                "label": "Redwood Park"
            },
            {
                "value": 6993,
                "label": "Renmark"
            },
            {
                "value": 6994,
                "label": "Renmark Paringa"
            },
            {
                "value": 6995,
                "label": "Renmark West"
            },
            {
                "value": 6996,
                "label": "Renown Park"
            },
            {
                "value": 7001,
                "label": "Reynella"
            },
            {
                "value": 7002,
                "label": "Reynella East"
            },
            {
                "value": 7010,
                "label": "Richmond"
            },
            {
                "value": 7012,
                "label": "Ridgehaven"
            },
            {
                "value": 7014,
                "label": "Ridleyton"
            },
            {
                "value": 7019,
                "label": "Risdon Park"
            },
            {
                "value": 7020,
                "label": "Risdon Park South"
            },
            {
                "value": 7032,
                "label": "Robe"
            },
            {
                "value": 7060,
                "label": "Rose Park"
            },
            {
                "value": 7073,
                "label": "Rosewater"
            },
            {
                "value": 7078,
                "label": "Rosslyn Park"
            },
            {
                "value": 7080,
                "label": "Rostrevor"
            },
            {
                "value": 7085,
                "label": "Roxby Downs"
            },
            {
                "value": 7086,
                "label": "Royal Park"
            },
            {
                "value": 7087,
                "label": "Royston Park"
            },
            {
                "value": 7119,
                "label": "Salisbury"
            },
            {
                "value": 7121,
                "label": "Salisbury Downs"
            },
            {
                "value": 7122,
                "label": "Salisbury East"
            },
            {
                "value": 7123,
                "label": "Salisbury Heights"
            },
            {
                "value": 7124,
                "label": "Salisbury North"
            },
            {
                "value": 7125,
                "label": "Salisbury Park"
            },
            {
                "value": 7126,
                "label": "Salisbury Plain"
            },
            {
                "value": 7159,
                "label": "Seacliff"
            },
            {
                "value": 7160,
                "label": "Seacliff Park"
            },
            {
                "value": 7161,
                "label": "Seacombe Gardens"
            },
            {
                "value": 7162,
                "label": "Seacombe Heights"
            },
            {
                "value": 7164,
                "label": "Seaford"
            },
            {
                "value": 7165,
                "label": "Seaford Meadows"
            },
            {
                "value": 7166,
                "label": "Seaford Rise"
            },
            {
                "value": 7169,
                "label": "Seaton"
            },
            {
                "value": 7170,
                "label": "Seaview Downs"
            },
            {
                "value": 7175,
                "label": "Sefton Park"
            },
            {
                "value": 7177,
                "label": "Sellicks Beach"
            },
            {
                "value": 7178,
                "label": "Semaphore"
            },
            {
                "value": 7179,
                "label": "Semaphore Park"
            },
            {
                "value": 7180,
                "label": "Semaphore South"
            },
            {
                "value": 7196,
                "label": "Sheidow Park"
            },
            {
                "value": 7227,
                "label": "Smithfield"
            },
            {
                "value": 7229,
                "label": "Smithfield Plains"
            },
            {
                "value": 7238,
                "label": "Solomontown"
            },
            {
                "value": 7243,
                "label": "Somerton Park"
            },
            {
                "value": 7252,
                "label": "South Brighton"
            },
            {
                "value": 7282,
                "label": "South Plympton"
            },
            {
                "value": 7295,
                "label": "Southern Mallee"
            },
            {
                "value": 7318,
                "label": "St Agnes"
            },
            {
                "value": 7324,
                "label": "St Georges"
            },
            {
                "value": 7335,
                "label": "St Marys"
            },
            {
                "value": 7336,
                "label": "St Morris"
            },
            {
                "value": 7337,
                "label": "St Peters"
            },
            {
                "value": 7346,
                "label": "Stirling"
            },
            {
                "value": 7349,
                "label": "Stirling North"
            },
            {
                "value": 7353,
                "label": "Stonyfell"
            },
            {
                "value": 7355,
                "label": "Strathalbyn"
            },
            {
                "value": 7366,
                "label": "Streaky Bay"
            },
            {
                "value": 7370,
                "label": "Sturt"
            },
            {
                "value": 7393,
                "label": "Surrey Downs"
            },
            {
                "value": 7416,
                "label": "Tailem Bend"
            },
            {
                "value": 7431,
                "label": "Tanunda"
            },
            {
                "value": 7432,
                "label": "Taperoo"
            },
            {
                "value": 7448,
                "label": "Tatiara"
            },
            {
                "value": 7454,
                "label": "Tea Tree Gully"
            },
            {
                "value": 7469,
                "label": "Tennyson"
            },
            {
                "value": 7481,
                "label": "The Coorong"
            },
            {
                "value": 7497,
                "label": "Thebarton"
            },
            {
                "value": 7536,
                "label": "Toorak Gardens"
            },
            {
                "value": 7545,
                "label": "Torrens Park"
            },
            {
                "value": 7546,
                "label": "Torrensville"
            },
            {
                "value": 7557,
                "label": "Tranmere"
            },
            {
                "value": 7566,
                "label": "Trinity Gardens"
            },
            {
                "value": 7568,
                "label": "Trott Park"
            },
            {
                "value": 7578,
                "label": "Tumby Bay"
            },
            {
                "value": 7588,
                "label": "Tusmore"
            },
            {
                "value": 7595,
                "label": "Two Wells"
            },
            {
                "value": 7602,
                "label": "Underdale"
            },
            {
                "value": 7604,
                "label": "Unley"
            },
            {
                "value": 7605,
                "label": "Unley Park"
            },
            {
                "value": 7621,
                "label": "Vale Park"
            },
            {
                "value": 7625,
                "label": "Valley View"
            },
            {
                "value": 7631,
                "label": "Victor Harbor"
            },
            {
                "value": 7642,
                "label": "Virginia"
            },
            {
                "value": 7657,
                "label": "Waikerie"
            },
            {
                "value": 7660,
                "label": "Wakefield"
            },
            {
                "value": 7667,
                "label": "Walkerville"
            },
            {
                "value": 7668,
                "label": "Walkley Heights"
            },
            {
                "value": 7672,
                "label": "Wallaroo"
            },
            {
                "value": 7711,
                "label": "Warradale"
            },
            {
                "value": 7731,
                "label": "Waterloo Corner"
            },
            {
                "value": 7740,
                "label": "Wattle Park"
            },
            {
                "value": 7742,
                "label": "Wattle Range"
            },
            {
                "value": 7750,
                "label": "Wayville"
            },
            {
                "value": 7779,
                "label": "West Beach"
            },
            {
                "value": 7783,
                "label": "West Croydon"
            },
            {
                "value": 7789,
                "label": "West Hindmarsh"
            },
            {
                "value": 7793,
                "label": "West Lakes"
            },
            {
                "value": 7794,
                "label": "West Lakes Shore"
            },
            {
                "value": 7816,
                "label": "Westbourne Park"
            },
            {
                "value": 7843,
                "label": "Whyalla"
            },
            {
                "value": 7844,
                "label": "Whyalla Jenkins"
            },
            {
                "value": 7845,
                "label": "Whyalla Norrie"
            },
            {
                "value": 7846,
                "label": "Whyalla Playford"
            },
            {
                "value": 7847,
                "label": "Whyalla Stuart"
            },
            {
                "value": 7854,
                "label": "Willaston"
            },
            {
                "value": 7859,
                "label": "Williamstown"
            },
            {
                "value": 7867,
                "label": "Willunga"
            },
            {
                "value": 7883,
                "label": "Windsor Gardens"
            },
            {
                "value": 7915,
                "label": "Woodcroft"
            },
            {
                "value": 7926,
                "label": "Woodside"
            },
            {
                "value": 7928,
                "label": "Woodville"
            },
            {
                "value": 7929,
                "label": "Woodville Gardens"
            },
            {
                "value": 7930,
                "label": "Woodville North"
            },
            {
                "value": 7931,
                "label": "Woodville Park"
            },
            {
                "value": 7932,
                "label": "Woodville South"
            },
            {
                "value": 7933,
                "label": "Woodville West"
            },
            {
                "value": 7956,
                "label": "Wudinna"
            },
            {
                "value": 7972,
                "label": "Wynn Vale"
            },
            {
                "value": 7993,
                "label": "Yankalilla"
            },
            {
                "value": 8026,
                "label": "Yorke Peninsula"
            }
        ]
    },
    {stateCode: "TAS",
        city: [
            {
                "value": 3916,
                "label": "Acton Park"
            },
            {
                "value": 4047,
                "label": "Austins Ferry"
            },
            {
                "value": 4062,
                "label": "Bagdad"
            },
            {
                "value": 4145,
                "label": "Battery Point"
            },
            {
                "value": 4160,
                "label": "Beaconsfield"
            },
            {
                "value": 4170,
                "label": "Beauty Point"
            },
            {
                "value": 4200,
                "label": "Bellerive"
            },
            {
                "value": 4239,
                "label": "Berriedale"
            },
            {
                "value": 4289,
                "label": "Blackmans Bay"
            },
            {
                "value": 4292,
                "label": "Blackstone Heights"
            },
            {
                "value": 4387,
                "label": "Break O'Day"
            },
            {
                "value": 4398,
                "label": "Bridgewater"
            },
            {
                "value": 4399,
                "label": "Bridport"
            },
            {
                "value": 4404,
                "label": "Brighton"
            },
            {
                "value": 4484,
                "label": "Burnie"
            },
            {
                "value": 4540,
                "label": "Cambridge"
            },
            {
                "value": 4649,
                "label": "Central Coast"
            },
            {
                "value": 4653,
                "label": "Central Highlands"
            },
            {
                "value": 4689,
                "label": "Chigwell"
            },
            {
                "value": 4707,
                "label": "Circular Head"
            },
            {
                "value": 4717,
                "label": "Claremont"
            },
            {
                "value": 4720,
                "label": "Clarence"
            },
            {
                "value": 4725,
                "label": "Clarendon Vale"
            },
            {
                "value": 4878,
                "label": "Cressy"
            },
            {
                "value": 4911,
                "label": "Currie"
            },
            {
                "value": 4917,
                "label": "Cygnet"
            },
            {
                "value": 4967,
                "label": "Deloraine"
            },
            {
                "value": 4981,
                "label": "Derwent Valley"
            },
            {
                "value": 4984,
                "label": "Devonport"
            },
            {
                "value": 4999,
                "label": "Dodges Ferry"
            },
            {
                "value": 5015,
                "label": "Dorset"
            },
            {
                "value": 5052,
                "label": "Dynnyrne"
            },
            {
                "value": 5073,
                "label": "East Devonport"
            },
            {
                "value": 5085,
                "label": "East Launceston"
            },
            {
                "value": 5191,
                "label": "Evandale"
            },
            {
                "value": 5250,
                "label": "Flinders"
            },
            {
                "value": 5277,
                "label": "Franklin"
            },
            {
                "value": 5297,
                "label": "Gagebrook"
            },
            {
                "value": 5319,
                "label": "Geeveston"
            },
            {
                "value": 5320,
                "label": "Geilston Bay"
            },
            {
                "value": 5324,
                "label": "George Town"
            },
            {
                "value": 5350,
                "label": "Glamorgan/Spring Bay"
            },
            {
                "value": 5385,
                "label": "Glenorchy"
            },
            {
                "value": 5409,
                "label": "Goodwood"
            },
            {
                "value": 5438,
                "label": "Granton"
            },
            {
                "value": 5503,
                "label": "Hadspen"
            },
            {
                "value": 5582,
                "label": "Herdsmans Cove"
            },
            {
                "value": 5609,
                "label": "Hillcrest"
            },
            {
                "value": 5621,
                "label": "Hobart"
            },
            {
                "value": 5622,
                "label": "Hobart city centre"
            },
            {
                "value": 5660,
                "label": "Howrah"
            },
            {
                "value": 5673,
                "label": "Huon Valley"
            },
            {
                "value": 5674,
                "label": "Huonville"
            },
            {
                "value": 5700,
                "label": "Invermay"
            },
            {
                "value": 5835,
                "label": "Kentish"
            },
            {
                "value": 5865,
                "label": "King Island"
            },
            {
                "value": 5867,
                "label": "Kingborough"
            },
            {
                "value": 5872,
                "label": "Kings Meadows"
            },
            {
                "value": 5882,
                "label": "Kingston"
            },
            {
                "value": 5887,
                "label": "Kingston Beach"
            },
            {
                "value": 5982,
                "label": "Latrobe"
            },
            {
                "value": 5984,
                "label": "Lauderdale"
            },
            {
                "value": 5985,
                "label": "Launceston"
            },
            {
                "value": 5986,
                "label": "Launceston city centre"
            },
            {
                "value": 6000,
                "label": "Legana"
            },
            {
                "value": 6005,
                "label": "Lenah Valley"
            },
            {
                "value": 6028,
                "label": "Lindisfarne"
            },
            {
                "value": 6064,
                "label": "Longford"
            },
            {
                "value": 6087,
                "label": "Lutana"
            },
            {
                "value": 6177,
                "label": "Margate"
            },
            {
                "value": 6207,
                "label": "Mayfield"
            },
            {
                "value": 6229,
                "label": "Meander Valley"
            },
            {
                "value": 6268,
                "label": "Miandetta"
            },
            {
                "value": 6282,
                "label": "Midway Point"
            },
            {
                "value": 6350,
                "label": "Montello"
            },
            {
                "value": 6355,
                "label": "Montrose"
            },
            {
                "value": 6359,
                "label": "Moonah"
            },
            {
                "value": 6389,
                "label": "Mornington"
            },
            {
                "value": 6446,
                "label": "Mount Nelson"
            },
            {
                "value": 6459,
                "label": "Mount Stuart"
            },
            {
                "value": 6467,
                "label": "Mowbray"
            },
            {
                "value": 6560,
                "label": "New Norfolk"
            },
            {
                "value": 6561,
                "label": "New Town"
            },
            {
                "value": 6571,
                "label": "Newnham"
            },
            {
                "value": 6575,
                "label": "Newstead"
            },
            {
                "value": 6632,
                "label": "North Hobart"
            },
            {
                "value": 6668,
                "label": "Northern Midlands"
            },
            {
                "value": 6674,
                "label": "Norwood"
            },
            {
                "value": 6697,
                "label": "Oakdowns"
            },
            {
                "value": 6715,
                "label": "Old Beach"
            },
            {
                "value": 6787,
                "label": "Park Grove"
            },
            {
                "value": 6828,
                "label": "Penguin"
            },
            {
                "value": 6839,
                "label": "Perth"
            },
            {
                "value": 6906,
                "label": "Port Sorell"
            },
            {
                "value": 6924,
                "label": "Prospect Vale"
            },
            {
                "value": 6943,
                "label": "Queenstown"
            },
            {
                "value": 6959,
                "label": "Ranelagh"
            },
            {
                "value": 6970,
                "label": "Ravenswood"
            },
            {
                "value": 7009,
                "label": "Richmond"
            },
            {
                "value": 7021,
                "label": "Risdon Vale"
            },
            {
                "value": 7024,
                "label": "Riverside"
            },
            {
                "value": 7039,
                "label": "Rocherlea"
            },
            {
                "value": 7050,
                "label": "Rokeby"
            },
            {
                "value": 7053,
                "label": "Romaine"
            },
            {
                "value": 7070,
                "label": "Rosetta"
            },
            {
                "value": 7115,
                "label": "Saint Leonards"
            },
            {
                "value": 7134,
                "label": "Sandford"
            },
            {
                "value": 7141,
                "label": "Sandy Bay"
            },
            {
                "value": 7156,
                "label": "Scottsdale"
            },
            {
                "value": 7185,
                "label": "Seven Mile Beach"
            },
            {
                "value": 7194,
                "label": "Shearwater"
            },
            {
                "value": 7195,
                "label": "Sheffield"
            },
            {
                "value": 7209,
                "label": "Shorewell Park"
            },
            {
                "value": 7231,
                "label": "Smithton"
            },
            {
                "value": 7234,
                "label": "Snug"
            },
            {
                "value": 7242,
                "label": "Somerset"
            },
            {
                "value": 7246,
                "label": "Sorell"
            },
            {
                "value": 7265,
                "label": "South Hobart"
            },
            {
                "value": 7272,
                "label": "South Launceston"
            },
            {
                "value": 7296,
                "label": "Southern Midlands"
            },
            {
                "value": 7306,
                "label": "Spreyton"
            },
            {
                "value": 7326,
                "label": "St Helens"
            },
            {
                "value": 7375,
                "label": "Summerhill"
            },
            {
                "value": 7441,
                "label": "Taroona"
            },
            {
                "value": 7446,
                "label": "Tasman Peninsula"
            },
            {
                "value": 7556,
                "label": "Tranmere"
            },
            {
                "value": 7563,
                "label": "Trevallyn"
            },
            {
                "value": 7583,
                "label": "Turners Beach"
            },
            {
                "value": 7599,
                "label": "Ulverstone"
            },
            {
                "value": 7606,
                "label": "Upper Burnie"
            },
            {
                "value": 7701,
                "label": "Waratah/Wynyard"
            },
            {
                "value": 7715,
                "label": "Warrane"
            },
            {
                "value": 7748,
                "label": "Waverley"
            },
            {
                "value": 7782,
                "label": "West Coast"
            },
            {
                "value": 7790,
                "label": "West Hobart"
            },
            {
                "value": 7796,
                "label": "West Launceston"
            },
            {
                "value": 7800,
                "label": "West Moonah"
            },
            {
                "value": 7807,
                "label": "West Tamar"
            },
            {
                "value": 7809,
                "label": "West Ulverstone"
            },
            {
                "value": 7818,
                "label": "Westbury"
            },
            {
                "value": 7975,
                "label": "Wynyard"
            },
            {
                "value": 8029,
                "label": "Youngtown"
            }
        ]
    },
    {stateCode: "VIC",
        city: [
            {
                "value": 3904,
                "label": "Abbotsford"
            },
            {
                "value": 3909,
                "label": "Aberfeldie"
            },
            {
                "value": 3926,
                "label": "Airport West"
            },
            {
                "value": 3929,
                "label": "Albanvale"
            },
            {
                "value": 3934,
                "label": "Albert Park"
            },
            {
                "value": 3936,
                "label": "Albion"
            },
            {
                "value": 3947,
                "label": "Alexandra"
            },
            {
                "value": 3954,
                "label": "Alfredton"
            },
            {
                "value": 3960,
                "label": "Allansford"
            },
            {
                "value": 3966,
                "label": "Alphington"
            },
            {
                "value": 3967,
                "label": "Alpine"
            },
            {
                "value": 3970,
                "label": "Altona"
            },
            {
                "value": 3971,
                "label": "Altona Meadows"
            },
            {
                "value": 3972,
                "label": "Altona North"
            },
            {
                "value": 3982,
                "label": "Anglesea"
            },
            {
                "value": 3990,
                "label": "Apollo Bay"
            },
            {
                "value": 3996,
                "label": "Ararat"
            },
            {
                "value": 3999,
                "label": "Ardeer"
            },
            {
                "value": 4004,
                "label": "Armadale"
            },
            {
                "value": 4006,
                "label": "Armstrong Creek"
            },
            {
                "value": 4012,
                "label": "Ascot"
            },
            {
                "value": 4015,
                "label": "Ascot Vale"
            },
            {
                "value": 4016,
                "label": "Ashburton"
            },
            {
                "value": 4028,
                "label": "Ashwood"
            },
            {
                "value": 4029,
                "label": "Aspendale"
            },
            {
                "value": 4030,
                "label": "Aspendale Gardens"
            },
            {
                "value": 4037,
                "label": "Attwood"
            },
            {
                "value": 4051,
                "label": "Avenel"
            },
            {
                "value": 4053,
                "label": "Avoca"
            },
            {
                "value": 4057,
                "label": "Avondale Heights"
            },
            {
                "value": 4060,
                "label": "Bacchus Marsh"
            },
            {
                "value": 4061,
                "label": "Badger Creek"
            },
            {
                "value": 4064,
                "label": "Bairnsdale"
            },
            {
                "value": 4068,
                "label": "Balaclava"
            },
            {
                "value": 4079,
                "label": "Ballan"
            },
            {
                "value": 4080,
                "label": "Ballarat"
            },
            {
                "value": 4081,
                "label": "Ballarat Central"
            },
            {
                "value": 4082,
                "label": "Ballarat East"
            },
            {
                "value": 4083,
                "label": "Ballarat North"
            },
            {
                "value": 4088,
                "label": "Balnarring"
            },
            {
                "value": 4091,
                "label": "Balwyn"
            },
            {
                "value": 4092,
                "label": "Balwyn North"
            },
            {
                "value": 4104,
                "label": "Bannockburn"
            },
            {
                "value": 4107,
                "label": "Banyule"
            },
            {
                "value": 4109,
                "label": "Baranduda"
            },
            {
                "value": 4131,
                "label": "Barwon Heads"
            },
            {
                "value": 4133,
                "label": "Bass Coast"
            },
            {
                "value": 4147,
                "label": "Baw Baw"
            },
            {
                "value": 4148,
                "label": "Baxter"
            },
            {
                "value": 4152,
                "label": "Bayside"
            },
            {
                "value": 4153,
                "label": "Bayswater"
            },
            {
                "value": 4155,
                "label": "Bayswater North"
            },
            {
                "value": 4161,
                "label": "Beaconsfield"
            },
            {
                "value": 4164,
                "label": "Beaconsfield Upper"
            },
            {
                "value": 4166,
                "label": "Beaufort"
            },
            {
                "value": 4167,
                "label": "Beaumaris"
            },
            {
                "value": 4176,
                "label": "Beechworth"
            },
            {
                "value": 4188,
                "label": "Belgrave"
            },
            {
                "value": 4189,
                "label": "Belgrave Heights"
            },
            {
                "value": 4190,
                "label": "Belgrave South"
            },
            {
                "value": 4191,
                "label": "Bell Park"
            },
            {
                "value": 4192,
                "label": "Bell Post Hill"
            },
            {
                "value": 4204,
                "label": "Bellfield"
            },
            {
                "value": 4210,
                "label": "Belmont"
            },
            {
                "value": 4216,
                "label": "Benalla"
            },
            {
                "value": 4218,
                "label": "Bendigo"
            },
            {
                "value": 4219,
                "label": "Bendigo city centre"
            },
            {
                "value": 4223,
                "label": "Bentleigh"
            },
            {
                "value": 4224,
                "label": "Bentleigh East"
            },
            {
                "value": 4246,
                "label": "Berwick"
            },
            {
                "value": 4248,
                "label": "Beveridge"
            },
            {
                "value": 4274,
                "label": "Bittern"
            },
            {
                "value": 4276,
                "label": "Black Hill"
            },
            {
                "value": 4279,
                "label": "Black Rock"
            },
            {
                "value": 4283,
                "label": "Blackburn"
            },
            {
                "value": 4284,
                "label": "Blackburn North"
            },
            {
                "value": 4285,
                "label": "Blackburn South"
            },
            {
                "value": 4299,
                "label": "Blairgowrie"
            },
            {
                "value": 4307,
                "label": "Blind Bight"
            },
            {
                "value": 4325,
                "label": "Bonbeach"
            },
            {
                "value": 4349,
                "label": "Boronia"
            },
            {
                "value": 4351,
                "label": "Boroondara"
            },
            {
                "value": 4353,
                "label": "Botanic Ridge"
            },
            {
                "value": 4368,
                "label": "Box Hill"
            },
            {
                "value": 4369,
                "label": "Box Hill North"
            },
            {
                "value": 4370,
                "label": "Box Hill South"
            },
            {
                "value": 4386,
                "label": "Braybrook"
            },
            {
                "value": 4392,
                "label": "Briagolong"
            },
            {
                "value": 4393,
                "label": "Briar Hill"
            },
            {
                "value": 4400,
                "label": "Bright"
            },
            {
                "value": 4403,
                "label": "Brighton"
            },
            {
                "value": 4405,
                "label": "Brighton East"
            },
            {
                "value": 4407,
                "label": "Brimbank"
            },
            {
                "value": 4414,
                "label": "Broadford"
            },
            {
                "value": 4416,
                "label": "Broadmeadows"
            },
            {
                "value": 4425,
                "label": "Brookfield"
            },
            {
                "value": 4427,
                "label": "Brooklyn"
            },
            {
                "value": 4435,
                "label": "Brown Hill"
            },
            {
                "value": 4438,
                "label": "Brunswick"
            },
            {
                "value": 4440,
                "label": "Brunswick East"
            },
            {
                "value": 4442,
                "label": "Brunswick West"
            },
            {
                "value": 4455,
                "label": "Bulleen"
            },
            {
                "value": 4459,
                "label": "Buloke"
            },
            {
                "value": 4470,
                "label": "Bundoora"
            },
            {
                "value": 4474,
                "label": "Buninyong"
            },
            {
                "value": 4476,
                "label": "Bunyip"
            },
            {
                "value": 4487,
                "label": "Burnside"
            },
            {
                "value": 4489,
                "label": "Burnside Heights"
            },
            {
                "value": 4500,
                "label": "Burwood"
            },
            {
                "value": 4502,
                "label": "Burwood East"
            },
            {
                "value": 4523,
                "label": "Cairnlea"
            },
            {
                "value": 4529,
                "label": "California Gully"
            },
            {
                "value": 4537,
                "label": "Camberwell"
            },
            {
                "value": 4554,
                "label": "Campaspe"
            },
            {
                "value": 4556,
                "label": "Campbellfield"
            },
            {
                "value": 4557,
                "label": "Campbells Creek"
            },
            {
                "value": 4562,
                "label": "Camperdown"
            },
            {
                "value": 4565,
                "label": "Canadian"
            },
            {
                "value": 4575,
                "label": "Canterbury"
            },
            {
                "value": 4580,
                "label": "Cape Woolamai"
            },
            {
                "value": 4588,
                "label": "Cardinia"
            },
            {
                "value": 4597,
                "label": "Carisbrook"
            },
            {
                "value": 4600,
                "label": "Carlton"
            },
            {
                "value": 4602,
                "label": "Carlton North"
            },
            {
                "value": 4605,
                "label": "Carnegie"
            },
            {
                "value": 4607,
                "label": "Caroline Springs"
            },
            {
                "value": 4614,
                "label": "Carrum"
            },
            {
                "value": 4615,
                "label": "Carrum Downs"
            },
            {
                "value": 4620,
                "label": "Casey"
            },
            {
                "value": 4625,
                "label": "Casterton"
            },
            {
                "value": 4629,
                "label": "Castlemaine"
            },
            {
                "value": 4637,
                "label": "Caulfield"
            },
            {
                "value": 4638,
                "label": "Caulfield East"
            },
            {
                "value": 4639,
                "label": "Caulfield North"
            },
            {
                "value": 4640,
                "label": "Caulfield South"
            },
            {
                "value": 4652,
                "label": "Central Goldfields"
            },
            {
                "value": 4656,
                "label": "Chadstone"
            },
            {
                "value": 4667,
                "label": "Charlton"
            },
            {
                "value": 4676,
                "label": "Chelsea"
            },
            {
                "value": 4677,
                "label": "Chelsea Heights"
            },
            {
                "value": 4679,
                "label": "Cheltenham"
            },
            {
                "value": 4685,
                "label": "Chewton"
            },
            {
                "value": 4691,
                "label": "Chiltern"
            },
            {
                "value": 4696,
                "label": "Chirnside Park"
            },
            {
                "value": 4704,
                "label": "Churchill"
            },
            {
                "value": 4726,
                "label": "Clarinda"
            },
            {
                "value": 4730,
                "label": "Clayton"
            },
            {
                "value": 4731,
                "label": "Clayton South"
            },
            {
                "value": 4740,
                "label": "Clifton Hill"
            },
            {
                "value": 4741,
                "label": "Clifton Springs"
            },
            {
                "value": 4749,
                "label": "Clunes"
            },
            {
                "value": 4750,
                "label": "Clyde"
            },
            {
                "value": 4751,
                "label": "Clyde North"
            },
            {
                "value": 4755,
                "label": "Cobden"
            },
            {
                "value": 4756,
                "label": "Cobram"
            },
            {
                "value": 4757,
                "label": "Coburg"
            },
            {
                "value": 4758,
                "label": "Coburg North"
            },
            {
                "value": 4759,
                "label": "Cockatoo"
            },
            {
                "value": 4764,
                "label": "Cohuna"
            },
            {
                "value": 4765,
                "label": "Colac"
            },
            {
                "value": 4766,
                "label": "Colac-Otway"
            },
            {
                "value": 4767,
                "label": "Coldstream"
            },
            {
                "value": 4775,
                "label": "Collingwood"
            },
            {
                "value": 4806,
                "label": "Coolaroo"
            },
            {
                "value": 4834,
                "label": "Corangamite"
            },
            {
                "value": 4838,
                "label": "Corio"
            },
            {
                "value": 4845,
                "label": "Corryong"
            },
            {
                "value": 4853,
                "label": "Cowes"
            },
            {
                "value": 4860,
                "label": "Craigieburn"
            },
            {
                "value": 4864,
                "label": "Cranbourne"
            },
            {
                "value": 4865,
                "label": "Cranbourne East"
            },
            {
                "value": 4866,
                "label": "Cranbourne North"
            },
            {
                "value": 4867,
                "label": "Cranbourne South"
            },
            {
                "value": 4868,
                "label": "Cranbourne West"
            },
            {
                "value": 4874,
                "label": "Cremorne"
            },
            {
                "value": 4881,
                "label": "Creswick"
            },
            {
                "value": 4882,
                "label": "Crib Point"
            },
            {
                "value": 4890,
                "label": "Croydon"
            },
            {
                "value": 4892,
                "label": "Croydon Hills"
            },
            {
                "value": 4893,
                "label": "Croydon North"
            },
            {
                "value": 4895,
                "label": "Croydon South"
            },
            {
                "value": 4924,
                "label": "Dallas"
            },
            {
                "value": 4931,
                "label": "Dandenong"
            },
            {
                "value": 4932,
                "label": "Dandenong North"
            },
            {
                "value": 4936,
                "label": "Darebin"
            },
            {
                "value": 4937,
                "label": "Darley"
            },
            {
                "value": 4954,
                "label": "Daylesford"
            },
            {
                "value": 4962,
                "label": "Deer Park"
            },
            {
                "value": 4964,
                "label": "Delacombe"
            },
            {
                "value": 4965,
                "label": "Delahey"
            },
            {
                "value": 4975,
                "label": "Dennington"
            },
            {
                "value": 4980,
                "label": "Derrimut"
            },
            {
                "value": 4983,
                "label": "Devon Meadows"
            },
            {
                "value": 4987,
                "label": "Diamond Creek"
            },
            {
                "value": 4992,
                "label": "Diggers Rest"
            },
            {
                "value": 4993,
                "label": "Dimboola"
            },
            {
                "value": 4995,
                "label": "Dingley Village"
            },
            {
                "value": 4996,
                "label": "Dinner Plain"
            },
            {
                "value": 4998,
                "label": "Docklands"
            },
            {
                "value": 5001,
                "label": "Donald"
            },
            {
                "value": 5002,
                "label": "Doncaster"
            },
            {
                "value": 5003,
                "label": "Doncaster East"
            },
            {
                "value": 5007,
                "label": "Donvale"
            },
            {
                "value": 5013,
                "label": "Doreen"
            },
            {
                "value": 5022,
                "label": "Doveton"
            },
            {
                "value": 5028,
                "label": "Dromana"
            },
            {
                "value": 5029,
                "label": "Drouin"
            },
            {
                "value": 5032,
                "label": "Drysdale"
            },
            {
                "value": 5055,
                "label": "Eagle Point"
            },
            {
                "value": 5058,
                "label": "Eaglehawk"
            },
            {
                "value": 5059,
                "label": "Eaglemont"
            },
            {
                "value": 5064,
                "label": "East Bairnsdale"
            },
            {
                "value": 5066,
                "label": "East Bendigo"
            },
            {
                "value": 5075,
                "label": "East Geelong"
            },
            {
                "value": 5076,
                "label": "East Gippsland"
            },
            {
                "value": 5090,
                "label": "East Melbourne"
            },
            {
                "value": 5103,
                "label": "Echuca"
            },
            {
                "value": 5108,
                "label": "Eden Park"
            },
            {
                "value": 5115,
                "label": "Edithvale"
            },
            {
                "value": 5142,
                "label": "Elliminyt"
            },
            {
                "value": 5145,
                "label": "Elsternwick"
            },
            {
                "value": 5146,
                "label": "Eltham"
            },
            {
                "value": 5147,
                "label": "Eltham North"
            },
            {
                "value": 5148,
                "label": "Elwood"
            },
            {
                "value": 5150,
                "label": "Emerald"
            },
            {
                "value": 5159,
                "label": "Endeavour Hills"
            },
            {
                "value": 5164,
                "label": "Epping"
            },
            {
                "value": 5166,
                "label": "Epsom"
            },
            {
                "value": 5177,
                "label": "Essendon"
            },
            {
                "value": 5178,
                "label": "Essendon North"
            },
            {
                "value": 5179,
                "label": "Essendon West"
            },
            {
                "value": 5187,
                "label": "Eumemmerring"
            },
            {
                "value": 5189,
                "label": "Euroa"
            },
            {
                "value": 5203,
                "label": "Eynesbury"
            },
            {
                "value": 5205,
                "label": "Fairfield"
            },
            {
                "value": 5215,
                "label": "Falls Creek"
            },
            {
                "value": 5221,
                "label": "Fawkner"
            },
            {
                "value": 5227,
                "label": "Ferntree Gully"
            },
            {
                "value": 5229,
                "label": "Ferny Creek"
            },
            {
                "value": 5241,
                "label": "Fitzroy"
            },
            {
                "value": 5243,
                "label": "Fitzroy North"
            },
            {
                "value": 5246,
                "label": "Flemington"
            },
            {
                "value": 5254,
                "label": "Flora Hill"
            },
            {
                "value": 5259,
                "label": "Footscray"
            },
            {
                "value": 5264,
                "label": "Forest Hill"
            },
            {
                "value": 5276,
                "label": "Foster"
            },
            {
                "value": 5280,
                "label": "Frankston"
            },
            {
                "value": 5281,
                "label": "Frankston East"
            },
            {
                "value": 5282,
                "label": "Frankston North"
            },
            {
                "value": 5283,
                "label": "Frankston South"
            },
            {
                "value": 5301,
                "label": "Gannawarra"
            },
            {
                "value": 5305,
                "label": "Garfield"
            },
            {
                "value": 5316,
                "label": "Geelong"
            },
            {
                "value": 5318,
                "label": "Geelong city centre"
            },
            {
                "value": 5317,
                "label": "Geelong West"
            },
            {
                "value": 5322,
                "label": "Gembrook"
            },
            {
                "value": 5345,
                "label": "Gisborne"
            },
            {
                "value": 5349,
                "label": "Gladstone Park"
            },
            {
                "value": 5356,
                "label": "Glen Eira"
            },
            {
                "value": 5358,
                "label": "Glen Huntly"
            },
            {
                "value": 5362,
                "label": "Glen Iris"
            },
            {
                "value": 5364,
                "label": "Glen Waverley"
            },
            {
                "value": 5372,
                "label": "Glenelg"
            },
            {
                "value": 5377,
                "label": "Glenferrie"
            },
            {
                "value": 5380,
                "label": "Glengarry"
            },
            {
                "value": 5387,
                "label": "Glenroy"
            },
            {
                "value": 5404,
                "label": "Golden Plains"
            },
            {
                "value": 5405,
                "label": "Golden Point"
            },
            {
                "value": 5406,
                "label": "Golden Square"
            },
            {
                "value": 5419,
                "label": "Gordon"
            },
            {
                "value": 5428,
                "label": "Gowanbrae"
            },
            {
                "value": 5445,
                "label": "Greater Bendigo"
            },
            {
                "value": 5446,
                "label": "Greater Dandenong"
            },
            {
                "value": 5447,
                "label": "Greater Geelong"
            },
            {
                "value": 5449,
                "label": "Greater Shepparton"
            },
            {
                "value": 5458,
                "label": "Greensborough"
            },
            {
                "value": 5460,
                "label": "Greenvale"
            },
            {
                "value": 5474,
                "label": "Grovedale"
            },
            {
                "value": 5501,
                "label": "Haddon"
            },
            {
                "value": 5502,
                "label": "Hadfield"
            },
            {
                "value": 5506,
                "label": "Hallam"
            },
            {
                "value": 5511,
                "label": "Hamilton"
            },
            {
                "value": 5515,
                "label": "Hamlyn Heights"
            },
            {
                "value": 5520,
                "label": "Hampton"
            },
            {
                "value": 5521,
                "label": "Hampton East"
            },
            {
                "value": 5522,
                "label": "Hampton Park"
            },
            {
                "value": 5535,
                "label": "Hastings"
            },
            {
                "value": 5537,
                "label": "Haven"
            },
            {
                "value": 5541,
                "label": "Hawthorn"
            },
            {
                "value": 5543,
                "label": "Hawthorn East"
            },
            {
                "value": 5544,
                "label": "Hawthorn South"
            },
            {
                "value": 5552,
                "label": "Hazelwood North"
            },
            {
                "value": 5554,
                "label": "Healesville"
            },
            {
                "value": 5557,
                "label": "Heathcote"
            },
            {
                "value": 5558,
                "label": "Heatherton"
            },
            {
                "value": 5559,
                "label": "Heathmont"
            },
            {
                "value": 5567,
                "label": "Heidelberg"
            },
            {
                "value": 5568,
                "label": "Heidelberg Heights"
            },
            {
                "value": 5569,
                "label": "Heidelberg West"
            },
            {
                "value": 5580,
                "label": "Hepburn"
            },
            {
                "value": 5586,
                "label": "Herne Hill"
            },
            {
                "value": 5590,
                "label": "Heyfield"
            },
            {
                "value": 5591,
                "label": "Heywood"
            },
            {
                "value": 5595,
                "label": "Highett"
            },
            {
                "value": 5601,
                "label": "Highton"
            },
            {
                "value": 5612,
                "label": "Hillside"
            },
            {
                "value": 5618,
                "label": "Hindmarsh"
            },
            {
                "value": 5620,
                "label": "Hmas Cerberus"
            },
            {
                "value": 5624,
                "label": "Hobsons Bay"
            },
            {
                "value": 5647,
                "label": "Hoppers Crossing"
            },
            {
                "value": 5652,
                "label": "Horsham"
            },
            {
                "value": 5655,
                "label": "Hotham Heights"
            },
            {
                "value": 5664,
                "label": "Hughesdale"
            },
            {
                "value": 5665,
                "label": "Hume"
            },
            {
                "value": 5670,
                "label": "Huntingdale"
            },
            {
                "value": 5672,
                "label": "Huntly"
            },
            {
                "value": 5676,
                "label": "Hurstbridge"
            },
            {
                "value": 5686,
                "label": "Indented Head"
            },
            {
                "value": 5687,
                "label": "Indigo"
            },
            {
                "value": 5698,
                "label": "Inverleigh"
            },
            {
                "value": 5699,
                "label": "Inverloch"
            },
            {
                "value": 5701,
                "label": "Invermay Park"
            },
            {
                "value": 5703,
                "label": "Ironbark"
            },
            {
                "value": 5705,
                "label": "Irymple"
            },
            {
                "value": 5710,
                "label": "Ivanhoe"
            },
            {
                "value": 5711,
                "label": "Ivanhoe East"
            },
            {
                "value": 5713,
                "label": "Jacana"
            },
            {
                "value": 5714,
                "label": "Jackass Flat"
            },
            {
                "value": 5720,
                "label": "Jan Juc"
            },
            {
                "value": 5749,
                "label": "Junction Village"
            },
            {
                "value": 5751,
                "label": "Junortoun"
            },
            {
                "value": 5761,
                "label": "Kalimna"
            },
            {
                "value": 5766,
                "label": "Kallista"
            },
            {
                "value": 5767,
                "label": "Kalorama"
            },
            {
                "value": 5774,
                "label": "Kangaroo Flat"
            },
            {
                "value": 5775,
                "label": "Kangaroo Ground"
            },
            {
                "value": 5803,
                "label": "Kealba"
            },
            {
                "value": 5807,
                "label": "Keilor"
            },
            {
                "value": 5808,
                "label": "Keilor Downs"
            },
            {
                "value": 5809,
                "label": "Keilor East"
            },
            {
                "value": 5810,
                "label": "Keilor Lodge"
            },
            {
                "value": 5811,
                "label": "Keilor Park"
            },
            {
                "value": 5826,
                "label": "Kennington"
            },
            {
                "value": 5827,
                "label": "Kensington"
            },
            {
                "value": 5839,
                "label": "Kerang"
            },
            {
                "value": 5841,
                "label": "Kew"
            },
            {
                "value": 5843,
                "label": "Kew East"
            },
            {
                "value": 5846,
                "label": "Keysborough"
            },
            {
                "value": 5847,
                "label": "Kialla"
            },
            {
                "value": 5859,
                "label": "Kilmore"
            },
            {
                "value": 5860,
                "label": "Kilsyth"
            },
            {
                "value": 5861,
                "label": "Kilsyth South"
            },
            {
                "value": 5868,
                "label": "Kinglake"
            },
            {
                "value": 5869,
                "label": "Kinglake West"
            },
            {
                "value": 5874,
                "label": "Kings Park"
            },
            {
                "value": 5875,
                "label": "Kingsbury"
            },
            {
                "value": 5884,
                "label": "Kingston"
            },
            {
                "value": 5889,
                "label": "Kingsville"
            },
            {
                "value": 5899,
                "label": "Knox"
            },
            {
                "value": 5900,
                "label": "Knoxfield"
            },
            {
                "value": 5905,
                "label": "Koo-Wee-Rup"
            },
            {
                "value": 5913,
                "label": "Koroit"
            },
            {
                "value": 5915,
                "label": "Korumburra"
            },
            {
                "value": 5931,
                "label": "Kurunjang"
            },
            {
                "value": 5934,
                "label": "Kyabram"
            },
            {
                "value": 5936,
                "label": "Kyneton"
            },
            {
                "value": 5944,
                "label": "Lake Gardens"
            },
            {
                "value": 5952,
                "label": "Lake Wendouree"
            },
            {
                "value": 5956,
                "label": "Lakes Entrance"
            },
            {
                "value": 5958,
                "label": "Lalor"
            },
            {
                "value": 5963,
                "label": "Lancefield"
            },
            {
                "value": 5969,
                "label": "Lang Lang"
            },
            {
                "value": 5971,
                "label": "Langwarrin"
            },
            {
                "value": 5972,
                "label": "Langwarrin South"
            },
            {
                "value": 5974,
                "label": "Lara"
            },
            {
                "value": 5983,
                "label": "Latrobe"
            },
            {
                "value": 5987,
                "label": "Launching Place"
            },
            {
                "value": 5988,
                "label": "Laverton"
            },
            {
                "value": 6008,
                "label": "Leongatha"
            },
            {
                "value": 6010,
                "label": "Leopold"
            },
            {
                "value": 6024,
                "label": "Lilydale"
            },
            {
                "value": 6039,
                "label": "Little River"
            },
            {
                "value": 6051,
                "label": "Loddon"
            },
            {
                "value": 6062,
                "label": "Long Gully"
            },
            {
                "value": 6065,
                "label": "Longford"
            },
            {
                "value": 6068,
                "label": "Longwarry"
            },
            {
                "value": 6070,
                "label": "Lorne"
            },
            {
                "value": 6072,
                "label": "Lovely Banks"
            },
            {
                "value": 6078,
                "label": "Lower Plenty"
            },
            {
                "value": 6082,
                "label": "Lucknow"
            },
            {
                "value": 6089,
                "label": "Lynbrook"
            },
            {
                "value": 6095,
                "label": "Lysterfield"
            },
            {
                "value": 6099,
                "label": "Macedon"
            },
            {
                "value": 6100,
                "label": "Macedon Ranges"
            },
            {
                "value": 6110,
                "label": "Macleod"
            },
            {
                "value": 6117,
                "label": "Maddingley"
            },
            {
                "value": 6121,
                "label": "Maffra"
            },
            {
                "value": 6125,
                "label": "Maiden Gully"
            },
            {
                "value": 6126,
                "label": "Maidstone"
            },
            {
                "value": 6135,
                "label": "Maldon"
            },
            {
                "value": 6137,
                "label": "Mallacoota"
            },
            {
                "value": 6140,
                "label": "Malvern"
            },
            {
                "value": 6142,
                "label": "Malvern East"
            },
            {
                "value": 6147,
                "label": "Manifold Heights"
            },
            {
                "value": 6156,
                "label": "Manningham"
            },
            {
                "value": 6161,
                "label": "Mansfield"
            },
            {
                "value": 6180,
                "label": "Maribyrnong"
            },
            {
                "value": 6186,
                "label": "Marong"
            },
            {
                "value": 6189,
                "label": "Maroondah"
            },
            {
                "value": 6197,
                "label": "Maryborough"
            },
            {
                "value": 6214,
                "label": "McCrae"
            },
            {
                "value": 6220,
                "label": "McKinnon"
            },
            {
                "value": 6224,
                "label": "Meadow Heights"
            },
            {
                "value": 6235,
                "label": "Melbourne"
            },
            {
                "value": 6236,
                "label": "Melbourne City Centre"
            },
            {
                "value": 6239,
                "label": "Melton"
            },
            {
                "value": 6240,
                "label": "Melton South"
            },
            {
                "value": 6241,
                "label": "Melton West"
            },
            {
                "value": 6247,
                "label": "Mentone"
            },
            {
                "value": 6250,
                "label": "Merbein"
            },
            {
                "value": 6258,
                "label": "Mernda"
            },
            {
                "value": 6266,
                "label": "Metung"
            },
            {
                "value": 6269,
                "label": "Mickleham"
            },
            {
                "value": 6273,
                "label": "Middle Park"
            },
            {
                "value": 6283,
                "label": "Mildura"
            },
            {
                "value": 6284,
                "label": "Mildura Shire"
            },
            {
                "value": 6288,
                "label": "Mill Park"
            },
            {
                "value": 6294,
                "label": "Millgrove"
            },
            {
                "value": 6308,
                "label": "Miners Rest"
            },
            {
                "value": 6316,
                "label": "Mirboo North"
            },
            {
                "value": 6320,
                "label": "Mitcham"
            },
            {
                "value": 6322,
                "label": "Mitchell"
            },
            {
                "value": 6333,
                "label": "Moe"
            },
            {
                "value": 6337,
                "label": "Moira"
            },
            {
                "value": 6344,
                "label": "Monash"
            },
            {
                "value": 6346,
                "label": "Monbulk"
            },
            {
                "value": 6348,
                "label": "Mont Albert"
            },
            {
                "value": 6349,
                "label": "Mont Albert North"
            },
            {
                "value": 6352,
                "label": "Montmorency"
            },
            {
                "value": 6354,
                "label": "Montrose"
            },
            {
                "value": 6357,
                "label": "Moolap"
            },
            {
                "value": 6362,
                "label": "Moonee Ponds"
            },
            {
                "value": 6363,
                "label": "Moonee Valley"
            },
            {
                "value": 6366,
                "label": "Moorabbin"
            },
            {
                "value": 6367,
                "label": "Moorabool"
            },
            {
                "value": 6372,
                "label": "Moorooduc"
            },
            {
                "value": 6374,
                "label": "Mooroolbark"
            },
            {
                "value": 6375,
                "label": "Mooroopna"
            },
            {
                "value": 6379,
                "label": "Mordialloc"
            },
            {
                "value": 6382,
                "label": "Moreland"
            },
            {
                "value": 6387,
                "label": "Mornington"
            },
            {
                "value": 6390,
                "label": "Mornington Peninsula"
            },
            {
                "value": 6395,
                "label": "Mortlake"
            },
            {
                "value": 6398,
                "label": "Morwell"
            },
            {
                "value": 6404,
                "label": "Mount Alexander"
            },
            {
                "value": 6409,
                "label": "Mount Buller"
            },
            {
                "value": 6411,
                "label": "Mount Clear"
            },
            {
                "value": 6417,
                "label": "Mount Dandenong"
            },
            {
                "value": 6419,
                "label": "Mount Duneed"
            },
            {
                "value": 6420,
                "label": "Mount Eliza"
            },
            {
                "value": 6421,
                "label": "Mount Evelyn"
            },
            {
                "value": 6426,
                "label": "Mount Helen"
            },
            {
                "value": 6438,
                "label": "Mount Macedon"
            },
            {
                "value": 6441,
                "label": "Mount Martha"
            },
            {
                "value": 6449,
                "label": "Mount Pleasant"
            },
            {
                "value": 6464,
                "label": "Mount Waverley"
            },
            {
                "value": 6468,
                "label": "Moyne"
            },
            {
                "value": 6476,
                "label": "Mulgrave"
            },
            {
                "value": 6496,
                "label": "Murrindindi"
            },
            {
                "value": 6499,
                "label": "Murrumbeena"
            },
            {
                "value": 6507,
                "label": "Myrtleford"
            },
            {
                "value": 6509,
                "label": "Nagambie"
            },
            {
                "value": 6537,
                "label": "Narre Warren"
            },
            {
                "value": 6538,
                "label": "Narre Warren North"
            },
            {
                "value": 6539,
                "label": "Narre Warren South"
            },
            {
                "value": 6543,
                "label": "Nathalia"
            },
            {
                "value": 6547,
                "label": "Neerim South"
            },
            {
                "value": 6557,
                "label": "New Gisborne"
            },
            {
                "value": 6562,
                "label": "Newborough"
            },
            {
                "value": 6566,
                "label": "Newcomb"
            },
            {
                "value": 6567,
                "label": "Newington"
            },
            {
                "value": 6573,
                "label": "Newport"
            },
            {
                "value": 6580,
                "label": "Newtown"
            },
            {
                "value": 6584,
                "label": "Nhill"
            },
            {
                "value": 6588,
                "label": "Nichols Point"
            },
            {
                "value": 6589,
                "label": "Nicholson"
            },
            {
                "value": 6591,
                "label": "Niddrie"
            },
            {
                "value": 6593,
                "label": "Nillumbik"
            },
            {
                "value": 6598,
                "label": "Noble Park"
            },
            {
                "value": 6599,
                "label": "Noble Park North"
            },
            {
                "value": 6606,
                "label": "Norlane"
            },
            {
                "value": 6617,
                "label": "North Bendigo"
            },
            {
                "value": 6621,
                "label": "North Brighton"
            },
            {
                "value": 6628,
                "label": "North Geelong"
            },
            {
                "value": 6640,
                "label": "North Melbourne"
            },
            {
                "value": 6657,
                "label": "North Warrandyte"
            },
            {
                "value": 6660,
                "label": "North Wonthaggi"
            },
            {
                "value": 6665,
                "label": "Northcote"
            },
            {
                "value": 6667,
                "label": "Northern Grampians"
            },
            {
                "value": 6677,
                "label": "Notting Hill"
            },
            {
                "value": 6684,
                "label": "Numurkah"
            },
            {
                "value": 6685,
                "label": "Nunawading"
            },
            {
                "value": 6690,
                "label": "Nyora"
            },
            {
                "value": 6694,
                "label": "Oak Park"
            },
            {
                "value": 6703,
                "label": "Oakleigh"
            },
            {
                "value": 6704,
                "label": "Oakleigh East"
            },
            {
                "value": 6705,
                "label": "Oakleigh South"
            },
            {
                "value": 6710,
                "label": "Ocean Grove"
            },
            {
                "value": 6713,
                "label": "Officer"
            },
            {
                "value": 6721,
                "label": "Olinda"
            },
            {
                "value": 6734,
                "label": "Orbost"
            },
            {
                "value": 6740,
                "label": "Ormond"
            },
            {
                "value": 6746,
                "label": "Ouyen"
            },
            {
                "value": 6763,
                "label": "Pakenham"
            },
            {
                "value": 6764,
                "label": "Pakenham Upper"
            },
            {
                "value": 6775,
                "label": "Panton Hill"
            },
            {
                "value": 6789,
                "label": "Park Orchards"
            },
            {
                "value": 6792,
                "label": "Parkdale"
            },
            {
                "value": 6800,
                "label": "Parkville"
            },
            {
                "value": 6809,
                "label": "Pascoe Vale"
            },
            {
                "value": 6810,
                "label": "Pascoe Vale South"
            },
            {
                "value": 6811,
                "label": "Patterson Lakes"
            },
            {
                "value": 6814,
                "label": "Paynesville"
            },
            {
                "value": 6821,
                "label": "Pearcedale"
            },
            {
                "value": 6849,
                "label": "Phillip Island"
            },
            {
                "value": 6867,
                "label": "Plenty"
            },
            {
                "value": 6868,
                "label": "Plumpton"
            },
            {
                "value": 6873,
                "label": "Point Cook"
            },
            {
                "value": 6875,
                "label": "Point Lonsdale"
            },
            {
                "value": 6890,
                "label": "Port Fairy"
            },
            {
                "value": 6898,
                "label": "Port Melbourne"
            },
            {
                "value": 6901,
                "label": "Port Phillip"
            },
            {
                "value": 6909,
                "label": "Portarlington"
            },
            {
                "value": 6911,
                "label": "Portland"
            },
            {
                "value": 6915,
                "label": "Prahran"
            },
            {
                "value": 6917,
                "label": "Preston"
            },
            {
                "value": 6920,
                "label": "Princes Hill"
            },
            {
                "value": 6925,
                "label": "Puckapunyal"
            },
            {
                "value": 6930,
                "label": "Pyrenees"
            },
            {
                "value": 6934,
                "label": "Quarry Hill"
            },
            {
                "value": 6940,
                "label": "Queenscliff"
            },
            {
                "value": 6942,
                "label": "Queenscliffe"
            },
            {
                "value": 6967,
                "label": "Ravenhall"
            },
            {
                "value": 6975,
                "label": "Red Cliffs"
            },
            {
                "value": 6978,
                "label": "Redan"
            },
            {
                "value": 6997,
                "label": "Research"
            },
            {
                "value": 6998,
                "label": "Reservoir"
            },
            {
                "value": 7007,
                "label": "Richmond"
            },
            {
                "value": 7015,
                "label": "Ringwood"
            },
            {
                "value": 7016,
                "label": "Ringwood East"
            },
            {
                "value": 7017,
                "label": "Ringwood North"
            },
            {
                "value": 7018,
                "label": "Ripponlea"
            },
            {
                "value": 7036,
                "label": "Robinvale"
            },
            {
                "value": 7040,
                "label": "Rochester"
            },
            {
                "value": 7041,
                "label": "Rockbank"
            },
            {
                "value": 7054,
                "label": "Romsey"
            },
            {
                "value": 7058,
                "label": "Rosanna"
            },
            {
                "value": 7062,
                "label": "Rosebud"
            },
            {
                "value": 7063,
                "label": "Rosebud West"
            },
            {
                "value": 7064,
                "label": "Rosedale"
            },
            {
                "value": 7076,
                "label": "Ross Creek"
            },
            {
                "value": 7083,
                "label": "Rowville"
            },
            {
                "value": 7084,
                "label": "Roxburgh Park"
            },
            {
                "value": 7094,
                "label": "Rushworth"
            },
            {
                "value": 7099,
                "label": "Rutherglen"
            },
            {
                "value": 7102,
                "label": "Rye"
            },
            {
                "value": 7107,
                "label": "Safety Beach"
            },
            {
                "value": 7108,
                "label": "Saint Albans"
            },
            {
                "value": 7109,
                "label": "Saint Andrews"
            },
            {
                "value": 7110,
                "label": "Saint Andrews Beach"
            },
            {
                "value": 7111,
                "label": "Saint Helena"
            },
            {
                "value": 7113,
                "label": "Saint Kilda"
            },
            {
                "value": 7114,
                "label": "Saint Leonards"
            },
            {
                "value": 7118,
                "label": "Sale"
            },
            {
                "value": 7131,
                "label": "San Remo"
            },
            {
                "value": 7136,
                "label": "Sandhurst"
            },
            {
                "value": 7137,
                "label": "Sandringham"
            },
            {
                "value": 7147,
                "label": "Sassafras"
            },
            {
                "value": 7155,
                "label": "Scoresby"
            },
            {
                "value": 7158,
                "label": "Seabrook"
            },
            {
                "value": 7163,
                "label": "Seaford"
            },
            {
                "value": 7168,
                "label": "Seaholme"
            },
            {
                "value": 7171,
                "label": "Sebastopol"
            },
            {
                "value": 7173,
                "label": "Seddon"
            },
            {
                "value": 7176,
                "label": "Selby"
            },
            {
                "value": 7187,
                "label": "Seville"
            },
            {
                "value": 7189,
                "label": "Seymour"
            },
            {
                "value": 7203,
                "label": "Shepparton"
            },
            {
                "value": 7204,
                "label": "Shepparton East"
            },
            {
                "value": 7213,
                "label": "Silvan"
            },
            {
                "value": 7224,
                "label": "Skye"
            },
            {
                "value": 7232,
                "label": "Smythes Creek"
            },
            {
                "value": 7233,
                "label": "Smythesdale"
            },
            {
                "value": 7235,
                "label": "Soldiers Hill"
            },
            {
                "value": 7239,
                "label": "Somers"
            },
            {
                "value": 7244,
                "label": "Somerville"
            },
            {
                "value": 7247,
                "label": "Sorrento"
            },
            {
                "value": 7259,
                "label": "South Gippsland"
            },
            {
                "value": 7269,
                "label": "South Kingsville"
            },
            {
                "value": 7276,
                "label": "South Melbourne"
            },
            {
                "value": 7277,
                "label": "South Morang"
            },
            {
                "value": 7290,
                "label": "South Yarra"
            },
            {
                "value": 7292,
                "label": "Southbank"
            },
            {
                "value": 7294,
                "label": "Southern Grampians"
            },
            {
                "value": 7305,
                "label": "Spotswood"
            },
            {
                "value": 7313,
                "label": "Springvale"
            },
            {
                "value": 7315,
                "label": "Springvale South"
            },
            {
                "value": 7319,
                "label": "St Albans Park"
            },
            {
                "value": 7325,
                "label": "St Helena"
            },
            {
                "value": 7332,
                "label": "St Kilda East"
            },
            {
                "value": 7333,
                "label": "St Kilda West"
            },
            {
                "value": 7345,
                "label": "Stawell"
            },
            {
                "value": 7352,
                "label": "Stonnington"
            },
            {
                "value": 7354,
                "label": "Stratford"
            },
            {
                "value": 7357,
                "label": "Strathbogie"
            },
            {
                "value": 7358,
                "label": "Strathdale"
            },
            {
                "value": 7361,
                "label": "Strathfieldsaye"
            },
            {
                "value": 7362,
                "label": "Strathmerton"
            },
            {
                "value": 7363,
                "label": "Strathmore"
            },
            {
                "value": 7378,
                "label": "Sunbury"
            },
            {
                "value": 7384,
                "label": "Sunshine"
            },
            {
                "value": 7388,
                "label": "Sunshine North"
            },
            {
                "value": 7389,
                "label": "Sunshine West"
            },
            {
                "value": 7390,
                "label": "Surf Coast"
            },
            {
                "value": 7394,
                "label": "Surrey Hills"
            },
            {
                "value": 7402,
                "label": "Swan Hill"
            },
            {
                "value": 7406,
                "label": "Sydenham"
            },
            {
                "value": 7418,
                "label": "Tallangatta"
            },
            {
                "value": 7440,
                "label": "Tarneit"
            },
            {
                "value": 7450,
                "label": "Tatura"
            },
            {
                "value": 7451,
                "label": "Taylors Hill"
            },
            {
                "value": 7452,
                "label": "Taylors Lakes"
            },
            {
                "value": 7455,
                "label": "Tecoma"
            },
            {
                "value": 7456,
                "label": "Teesdale"
            },
            {
                "value": 7464,
                "label": "Templestowe"
            },
            {
                "value": 7465,
                "label": "Templestowe Lower"
            },
            {
                "value": 7474,
                "label": "Terang"
            },
            {
                "value": 7480,
                "label": "The Basin"
            },
            {
                "value": 7491,
                "label": "The Patch"
            },
            {
                "value": 7501,
                "label": "Thomastown"
            },
            {
                "value": 7502,
                "label": "Thomson"
            },
            {
                "value": 7503,
                "label": "Thornbury"
            },
            {
                "value": 7514,
                "label": "Timboon"
            },
            {
                "value": 7529,
                "label": "Tongala"
            },
            {
                "value": 7534,
                "label": "Tooradin"
            },
            {
                "value": 7535,
                "label": "Toorak"
            },
            {
                "value": 7538,
                "label": "Tootgarook"
            },
            {
                "value": 7543,
                "label": "Torquay"
            },
            {
                "value": 7552,
                "label": "Towong"
            },
            {
                "value": 7554,
                "label": "Trafalgar"
            },
            {
                "value": 7558,
                "label": "Traralgon"
            },
            {
                "value": 7559,
                "label": "Travancore"
            },
            {
                "value": 7562,
                "label": "Trentham"
            },
            {
                "value": 7569,
                "label": "Truganina"
            },
            {
                "value": 7574,
                "label": "Tullamarine"
            },
            {
                "value": 7596,
                "label": "Tyabb"
            },
            {
                "value": 7614,
                "label": "Upwey"
            },
            {
                "value": 7629,
                "label": "Vermont"
            },
            {
                "value": 7630,
                "label": "Vermont South"
            },
            {
                "value": 7636,
                "label": "Viewbank"
            },
            {
                "value": 7655,
                "label": "Wahgunyah"
            },
            {
                "value": 7671,
                "label": "Wallan"
            },
            {
                "value": 7674,
                "label": "Wallington"
            },
            {
                "value": 7681,
                "label": "Wandana Heights"
            },
            {
                "value": 7684,
                "label": "Wandin North"
            },
            {
                "value": 7687,
                "label": "Wandong"
            },
            {
                "value": 7688,
                "label": "Wangaratta"
            },
            {
                "value": 7694,
                "label": "Wantirna"
            },
            {
                "value": 7695,
                "label": "Wantirna South"
            },
            {
                "value": 7702,
                "label": "Warburton"
            },
            {
                "value": 7710,
                "label": "Warracknabeal"
            },
            {
                "value": 7713,
                "label": "Warragul"
            },
            {
                "value": 7714,
                "label": "Warrandyte"
            },
            {
                "value": 7716,
                "label": "Warranwood"
            },
            {
                "value": 7723,
                "label": "Warrnambool"
            },
            {
                "value": 7734,
                "label": "Waterways"
            },
            {
                "value": 7736,
                "label": "Watsonia"
            },
            {
                "value": 7737,
                "label": "Watsonia North"
            },
            {
                "value": 7743,
                "label": "Wattleglen"
            },
            {
                "value": 7745,
                "label": "Waurn Ponds"
            },
            {
                "value": 7757,
                "label": "Wellington"
            },
            {
                "value": 7762,
                "label": "Wendouree"
            },
            {
                "value": 7767,
                "label": "Werribee"
            },
            {
                "value": 7768,
                "label": "Werribee South"
            },
            {
                "value": 7773,
                "label": "Wesburn"
            },
            {
                "value": 7785,
                "label": "West Footscray"
            },
            {
                "value": 7799,
                "label": "West Melbourne"
            },
            {
                "value": 7811,
                "label": "West Wimmera"
            },
            {
                "value": 7812,
                "label": "West Wodonga"
            },
            {
                "value": 7825,
                "label": "Westmeadows"
            },
            {
                "value": 7832,
                "label": "Wheelers Hill"
            },
            {
                "value": 7834,
                "label": "White Hills"
            },
            {
                "value": 7837,
                "label": "Whitehorse"
            },
            {
                "value": 7841,
                "label": "Whittington"
            },
            {
                "value": 7842,
                "label": "Whittlesea"
            },
            {
                "value": 7857,
                "label": "Williams Landing"
            },
            {
                "value": 7858,
                "label": "Williamstown"
            },
            {
                "value": 7860,
                "label": "Williamstown North"
            },
            {
                "value": 7874,
                "label": "Winchelsea"
            },
            {
                "value": 7879,
                "label": "Windsor"
            },
            {
                "value": 7895,
                "label": "Wodonga"
            },
            {
                "value": 7896,
                "label": "Wollert"
            },
            {
                "value": 7905,
                "label": "Wonga Park"
            },
            {
                "value": 7909,
                "label": "Wonthaggi"
            },
            {
                "value": 7917,
                "label": "Woodend"
            },
            {
                "value": 7945,
                "label": "Woori Yallock"
            },
            {
                "value": 7962,
                "label": "Wurruk"
            },
            {
                "value": 7965,
                "label": "Wy Yung"
            },
            {
                "value": 7969,
                "label": "Wyndham"
            },
            {
                "value": 7970,
                "label": "Wyndham Vale"
            },
            {
                "value": 7980,
                "label": "Yackandandah"
            },
            {
                "value": 7984,
                "label": "Yallambie"
            },
            {
                "value": 7986,
                "label": "Yallourn North"
            },
            {
                "value": 7995,
                "label": "Yarra"
            },
            {
                "value": 7996,
                "label": "Yarra Glen"
            },
            {
                "value": 7997,
                "label": "Yarra Junction"
            },
            {
                "value": 7998,
                "label": "Yarra Ranges"
            },
            {
                "value": 8001,
                "label": "Yarragon"
            },
            {
                "value": 8003,
                "label": "Yarram"
            },
            {
                "value": 8005,
                "label": "Yarrambat"
            },
            {
                "value": 8007,
                "label": "Yarraville"
            },
            {
                "value": 8009,
                "label": "Yarrawonga"
            },
            {
                "value": 8010,
                "label": "Yarriambiack"
            },
            {
                "value": 8014,
                "label": "Yea"
            }
        ]
    },
    {stateCode: 'WA',
        city: [
            {
                "value": 3902,
                "label": "Abbey"
            },
            {
                "value": 3930,
                "label": "Albany"
            },
            {
                "value": 3932,
                "label": "Albany city centre"
            },
            {
                "value": 3946,
                "label": "Alexander Heights"
            },
            {
                "value": 3953,
                "label": "Alfred Cove"
            },
            {
                "value": 3958,
                "label": "Alkimos"
            },
            {
                "value": 3992,
                "label": "Applecross"
            },
            {
                "value": 4000,
                "label": "Ardross"
            },
            {
                "value": 4003,
                "label": "Armadale"
            },
            {
                "value": 4013,
                "label": "Ascot"
            },
            {
                "value": 4017,
                "label": "Ashburton"
            },
            {
                "value": 4019,
                "label": "Ashby"
            },
            {
                "value": 4021,
                "label": "Ashfield"
            },
            {
                "value": 4036,
                "label": "Attadale"
            },
            {
                "value": 4038,
                "label": "Atwell"
            },
            {
                "value": 4039,
                "label": "Aubin Grove"
            },
            {
                "value": 4042,
                "label": "Augusta"
            },
            {
                "value": 4043,
                "label": "Augusta-Margaret River Shire"
            },
            {
                "value": 4049,
                "label": "Australind"
            },
            {
                "value": 4050,
                "label": "Aveley"
            },
            {
                "value": 149550,
                "label": "Badgingarra"
            },
            {
                "value": 4066,
                "label": "Bakers Hill"
            },
            {
                "value": 4070,
                "label": "Balcatta"
            },
            {
                "value": 4072,
                "label": "Baldivis"
            },
            {
                "value": 4073,
                "label": "Balga"
            },
            {
                "value": 4078,
                "label": "Ballajura"
            },
            {
                "value": 4097,
                "label": "Banjup"
            },
            {
                "value": 4101,
                "label": "Banksia Grove"
            },
            {
                "value": 4135,
                "label": "Bassendean"
            },
            {
                "value": 4138,
                "label": "Bateman"
            },
            {
                "value": 4150,
                "label": "Baynton"
            },
            {
                "value": 4151,
                "label": "Bayonet Head"
            },
            {
                "value": 4154,
                "label": "Bayswater"
            },
            {
                "value": 4157,
                "label": "Beachlands"
            },
            {
                "value": 4162,
                "label": "Beaconsfield"
            },
            {
                "value": 4171,
                "label": "Beckenham"
            },
            {
                "value": 4172,
                "label": "Bedford"
            },
            {
                "value": 4174,
                "label": "Bedfordale"
            },
            {
                "value": 4175,
                "label": "Beechboro"
            },
            {
                "value": 4178,
                "label": "Beeliar"
            },
            {
                "value": 4185,
                "label": "Beldon"
            },
            {
                "value": 4201,
                "label": "Bellevue"
            },
            {
                "value": 4209,
                "label": "Belmont"
            },
            {
                "value": 4220,
                "label": "Bennett Springs"
            },
            {
                "value": 4225,
                "label": "Bentley"
            },
            {
                "value": 4229,
                "label": "Beresford"
            },
            {
                "value": 4245,
                "label": "Bertram"
            },
            {
                "value": 4249,
                "label": "Beverley"
            },
            {
                "value": 4255,
                "label": "Bibra Lake"
            },
            {
                "value": 4256,
                "label": "Bicton"
            },
            {
                "value": 4262,
                "label": "Bilingurr"
            },
            {
                "value": 4264,
                "label": "Bindoon"
            },
            {
                "value": 4266,
                "label": "Binningup"
            },
            {
                "value": 4312,
                "label": "Bluff Point"
            },
            {
                "value": 4315,
                "label": "Boddington"
            },
            {
                "value": 4343,
                "label": "Booragoon"
            },
            {
                "value": 4356,
                "label": "Boulder"
            },
            {
                "value": 4371,
                "label": "Boyanup"
            },
            {
                "value": 4373,
                "label": "Boyup Brook"
            },
            {
                "value": 4374,
                "label": "Brabham"
            },
            {
                "value": 4390,
                "label": "Brentwood"
            },
            {
                "value": 4395,
                "label": "Bridgetown"
            },
            {
                "value": 4396,
                "label": "Bridgetown-Greenbushes"
            },
            {
                "value": 4418,
                "label": "Broadwater"
            },
            {
                "value": 4419,
                "label": "Brockman"
            },
            {
                "value": 4424,
                "label": "Brookdale"
            },
            {
                "value": 4429,
                "label": "Brookton"
            },
            {
                "value": 4432,
                "label": "Broome"
            },
            {
                "value": 4433,
                "label": "Broomehill-Tambellup"
            },
            {
                "value": 4437,
                "label": "Bruce Rock"
            },
            {
                "value": 4439,
                "label": "Brunswick"
            },
            {
                "value": 4451,
                "label": "Bulgarra"
            },
            {
                "value": 4453,
                "label": "Bull Creek"
            },
            {
                "value": 4458,
                "label": "Bullsbrook"
            },
            {
                "value": 4460,
                "label": "Bunbury"
            },
            {
                "value": 4485,
                "label": "Burns Beach"
            },
            {
                "value": 4498,
                "label": "Burswood"
            },
            {
                "value": 4505,
                "label": "Busselton"
            },
            {
                "value": 4506,
                "label": "Busselton city cenre"
            },
            {
                "value": 4507,
                "label": "Butler"
            },
            {
                "value": 4510,
                "label": "Byford"
            },
            {
                "value": 4516,
                "label": "Cable Beach"
            },
            {
                "value": 4530,
                "label": "Calista"
            },
            {
                "value": 4541,
                "label": "Cambridge"
            },
            {
                "value": 4549,
                "label": "Camillo"
            },
            {
                "value": 4569,
                "label": "Canning"
            },
            {
                "value": 4570,
                "label": "Canning Vale"
            },
            {
                "value": 4571,
                "label": "Cannington"
            },
            {
                "value": 4581,
                "label": "Capel"
            },
            {
                "value": 4589,
                "label": "Cardup"
            },
            {
                "value": 4591,
                "label": "Carey Park"
            },
            {
                "value": 4594,
                "label": "Carine"
            },
            {
                "value": 4599,
                "label": "Carlisle"
            },
            {
                "value": 4603,
                "label": "Carnamah"
            },
            {
                "value": 4604,
                "label": "Carnarvon"
            },
            {
                "value": 4610,
                "label": "Carramar"
            },
            {
                "value": 4631,
                "label": "Castletown"
            },
            {
                "value": 4633,
                "label": "Casuarina"
            },
            {
                "value": 149557,
                "label": "Cataby"
            },
            {
                "value": 4641,
                "label": "Caversham"
            },
            {
                "value": 149552,
                "label": "Cervantes"
            },
            {
                "value": 4659,
                "label": "Champion Lakes"
            },
            {
                "value": 4663,
                "label": "Chapman Valley"
            },
            {
                "value": 4686,
                "label": "Chidlow"
            },
            {
                "value": 4700,
                "label": "Chittering"
            },
            {
                "value": 4705,
                "label": "Churchlands"
            },
            {
                "value": 4709,
                "label": "City Beach"
            },
            {
                "value": 4710,
                "label": "City of Cockburn"
            },
            {
                "value": 4711,
                "label": "City of Perth"
            },
            {
                "value": 4718,
                "label": "Claremont"
            },
            {
                "value": 4727,
                "label": "Clarkson"
            },
            {
                "value": 4748,
                "label": "Cloverdale"
            },
            {
                "value": 4760,
                "label": "Cockburn Central"
            },
            {
                "value": 4773,
                "label": "College Grove"
            },
            {
                "value": 4774,
                "label": "Collie"
            },
            {
                "value": 4783,
                "label": "Como"
            },
            {
                "value": 4792,
                "label": "Connolly"
            },
            {
                "value": 4795,
                "label": "Coodanup"
            },
            {
                "value": 4797,
                "label": "Coogee"
            },
            {
                "value": 4807,
                "label": "Coolbellup"
            },
            {
                "value": 4808,
                "label": "Coolbinia"
            },
            {
                "value": 4809,
                "label": "Coolgardie"
            },
            {
                "value": 4811,
                "label": "Cooloongup"
            },
            {
                "value": 4825,
                "label": "Coorow"
            },
            {
                "value": 4843,
                "label": "Corrigin"
            },
            {
                "value": 4848,
                "label": "Cottesloe"
            },
            {
                "value": 4851,
                "label": "Cowaramup"
            },
            {
                "value": 4859,
                "label": "Craigie"
            },
            {
                "value": 4869,
                "label": "Cranbrook"
            },
            {
                "value": 4873,
                "label": "Crawley"
            },
            {
                "value": 4897,
                "label": "Cuballing"
            },
            {
                "value": 4898,
                "label": "Cue"
            },
            {
                "value": 4903,
                "label": "Cunderdin"
            },
            {
                "value": 4909,
                "label": "Currambine"
            },
            {
                "value": 4919,
                "label": "Daglish"
            },
            {
                "value": 4923,
                "label": "Dalkeith"
            },
            {
                "value": 4926,
                "label": "Dalwallinu"
            },
            {
                "value": 4927,
                "label": "Dalyellup"
            },
            {
                "value": 4928,
                "label": "Dampier"
            },
            {
                "value": 4929,
                "label": "Dampier Peninsula"
            },
            {
                "value": 4930,
                "label": "Dandaragan"
            },
            {
                "value": 4934,
                "label": "Darch"
            },
            {
                "value": 4935,
                "label": "Dardanup"
            },
            {
                "value": 4938,
                "label": "Darling Downs"
            },
            {
                "value": 4943,
                "label": "Darlington"
            },
            {
                "value": 4952,
                "label": "Dawesville"
            },
            {
                "value": 4955,
                "label": "Dayton"
            },
            {
                "value": 4968,
                "label": "Denham"
            },
            {
                "value": 4974,
                "label": "Denmark"
            },
            {
                "value": 4977,
                "label": "Derby"
            },
            {
                "value": 4978,
                "label": "Derby-West Kimberley"
            },
            {
                "value": 4988,
                "label": "Dianella"
            },
            {
                "value": 4997,
                "label": "Djugun"
            },
            {
                "value": 5004,
                "label": "Dongara"
            },
            {
                "value": 5005,
                "label": "Donnybrook"
            },
            {
                "value": 5006,
                "label": "Donnybrook-Balingup"
            },
            {
                "value": 5017,
                "label": "Doubleview"
            },
            {
                "value": 5023,
                "label": "Dowerin"
            },
            {
                "value": 5030,
                "label": "Drummond Cove"
            },
            {
                "value": 5035,
                "label": "Dudley Park"
            },
            {
                "value": 5039,
                "label": "Dumbleyung Shire"
            },
            {
                "value": 5040,
                "label": "Duncraig"
            },
            {
                "value": 5041,
                "label": "Dundas"
            },
            {
                "value": 5047,
                "label": "Dunsborough"
            },
            {
                "value": 5069,
                "label": "East Bunbury"
            },
            {
                "value": 5070,
                "label": "East Cannington"
            },
            {
                "value": 5071,
                "label": "East Carnarvon"
            },
            {
                "value": 5074,
                "label": "East Fremantle"
            },
            {
                "value": 5091,
                "label": "East Perth"
            },
            {
                "value": 5092,
                "label": "East Pilbara"
            },
            {
                "value": 5097,
                "label": "East Victoria Park"
            },
            {
                "value": 5101,
                "label": "Eaton"
            },
            {
                "value": 5106,
                "label": "Eden Hill"
            },
            {
                "value": 5113,
                "label": "Edgewater"
            },
            {
                "value": 5120,
                "label": "Eglinton"
            },
            {
                "value": 5141,
                "label": "Ellenbrook"
            },
            {
                "value": 5149,
                "label": "Embleton"
            },
            {
                "value": 5170,
                "label": "Erskine"
            },
            {
                "value": 5175,
                "label": "Esperance"
            },
            {
                "value": 5176,
                "label": "Esperance Shire"
            },
            {
                "value": 5202,
                "label": "Exmouth"
            },
            {
                "value": 5214,
                "label": "Falcon"
            },
            {
                "value": 5226,
                "label": "Ferndale"
            },
            {
                "value": 5242,
                "label": "Fitzroy Crossing"
            },
            {
                "value": 5256,
                "label": "Floreat"
            },
            {
                "value": 5271,
                "label": "Forrestdale"
            },
            {
                "value": 5273,
                "label": "Forrestfield"
            },
            {
                "value": 5289,
                "label": "Fremantle"
            },
            {
                "value": 5303,
                "label": "Garden Island"
            },
            {
                "value": 5321,
                "label": "Gelorup"
            },
            {
                "value": 5323,
                "label": "Geographe"
            },
            {
                "value": 5327,
                "label": "Geraldton"
            },
            {
                "value": 5328,
                "label": "Geraldton city centre"
            },
            {
                "value": 5330,
                "label": "Gidgegannup"
            },
            {
                "value": 5339,
                "label": "Gingin"
            },
            {
                "value": 5344,
                "label": "Girrawheen"
            },
            {
                "value": 5357,
                "label": "Glen Forrest"
            },
            {
                "value": 5361,
                "label": "Glen Iris"
            },
            {
                "value": 5368,
                "label": "Glendalough"
            },
            {
                "value": 5397,
                "label": "Gnangara"
            },
            {
                "value": 5398,
                "label": "Gnowangerup"
            },
            {
                "value": 5401,
                "label": "Golden Bay"
            },
            {
                "value": 5414,
                "label": "Goomalling"
            },
            {
                "value": 5417,
                "label": "Gooseberry Hill"
            },
            {
                "value": 5425,
                "label": "Gosnells"
            },
            {
                "value": 5441,
                "label": "Grasmere"
            },
            {
                "value": 149556,
                "label": "Green Head"
            },
            {
                "value": 5455,
                "label": "Greenfields"
            },
            {
                "value": 5456,
                "label": "Greenmount"
            },
            {
                "value": 5465,
                "label": "Greenwood"
            },
            {
                "value": 5475,
                "label": "Guildford"
            },
            {
                "value": 5490,
                "label": "Gwelup"
            },
            {
                "value": 5508,
                "label": "Halls Creek"
            },
            {
                "value": 5509,
                "label": "Halls Head"
            },
            {
                "value": 5510,
                "label": "Hamersley"
            },
            {
                "value": 5514,
                "label": "Hamilton Hill"
            },
            {
                "value": 5517,
                "label": "Hammond Park"
            },
            {
                "value": 5523,
                "label": "Hannans"
            },
            {
                "value": 5530,
                "label": "Harrisdale"
            },
            {
                "value": 5533,
                "label": "Harvey"
            },
            {
                "value": 5560,
                "label": "Heathridge"
            },
            {
                "value": 5570,
                "label": "Helena Valley"
            },
            {
                "value": 5578,
                "label": "Henley Brook"
            },
            {
                "value": 5585,
                "label": "Herne Hill"
            },
            {
                "value": 5593,
                "label": "High Wycombe"
            },
            {
                "value": 5597,
                "label": "Highgate"
            },
            {
                "value": 5603,
                "label": "Hilbert"
            },
            {
                "value": 149559,
                "label": "Hill River"
            },
            {
                "value": 5605,
                "label": "Hillarys"
            },
            {
                "value": 5610,
                "label": "Hillman"
            },
            {
                "value": 5615,
                "label": "Hilton"
            },
            {
                "value": 5625,
                "label": "Hocking"
            },
            {
                "value": 5671,
                "label": "Huntingdale"
            },
            {
                "value": 5683,
                "label": "Iluka"
            },
            {
                "value": 5692,
                "label": "Inglewood"
            },
            {
                "value": 5693,
                "label": "Innaloo"
            },
            {
                "value": 5704,
                "label": "Irwin"
            },
            {
                "value": 5721,
                "label": "Jandakot"
            },
            {
                "value": 5723,
                "label": "Jane Brook"
            },
            {
                "value": 5725,
                "label": "Jarrahdale"
            },
            {
                "value": 5729,
                "label": "Jerramungup"
            },
            {
                "value": 5735,
                "label": "Jindalee"
            },
            {
                "value": 5740,
                "label": "Jolimont"
            },
            {
                "value": 5741,
                "label": "Joondalup"
            },
            {
                "value": 5742,
                "label": "Joondanna"
            },
            {
                "value": 5752,
                "label": "Jurien Bay"
            },
            {
                "value": 5755,
                "label": "Kalamunda"
            },
            {
                "value": 5757,
                "label": "Kalbarri"
            },
            {
                "value": 5759,
                "label": "Kalgoorlie"
            },
            {
                "value": 5760,
                "label": "Kalgoorlie/Boulder"
            },
            {
                "value": 5765,
                "label": "Kallaroo"
            },
            {
                "value": 5769,
                "label": "Kambalda East"
            },
            {
                "value": 5770,
                "label": "Kambalda West"
            },
            {
                "value": 5786,
                "label": "Karawara"
            },
            {
                "value": 5787,
                "label": "Kardinya"
            },
            {
                "value": 5790,
                "label": "Karnup"
            },
            {
                "value": 5792,
                "label": "Karratha"
            },
            {
                "value": 5793,
                "label": "Karrinyup"
            },
            {
                "value": 5796,
                "label": "Katanning"
            },
            {
                "value": 5814,
                "label": "Kellerberrin"
            },
            {
                "value": 5817,
                "label": "Kelmscott"
            },
            {
                "value": 5832,
                "label": "Kent Shire"
            },
            {
                "value": 5836,
                "label": "Kenwick"
            },
            {
                "value": 5845,
                "label": "Kewdale"
            },
            {
                "value": 5850,
                "label": "Kiara"
            },
            {
                "value": 5880,
                "label": "Kingsley"
            },
            {
                "value": 5891,
                "label": "Kinross"
            },
            {
                "value": 5903,
                "label": "Kojonup"
            },
            {
                "value": 5904,
                "label": "Kondinin"
            },
            {
                "value": 5907,
                "label": "Koondoola"
            },
            {
                "value": 5910,
                "label": "Koorda"
            },
            {
                "value": 5921,
                "label": "Kulin"
            },
            {
                "value": 5923,
                "label": "Kununurra"
            },
            {
                "value": 5933,
                "label": "Kwinana"
            },
            {
                "value": 5945,
                "label": "Lake Grace"
            },
            {
                "value": 5953,
                "label": "Lakelands"
            },
            {
                "value": 5961,
                "label": "Lamington"
            },
            {
                "value": 149555,
                "label": "Lancelin"
            },
            {
                "value": 5965,
                "label": "Landsdale"
            },
            {
                "value": 5970,
                "label": "Langford"
            },
            {
                "value": 5981,
                "label": "Lathlain"
            },
            {
                "value": 5989,
                "label": "Laverton"
            },
            {
                "value": 5996,
                "label": "Leda"
            },
            {
                "value": 5997,
                "label": "Leederville"
            },
            {
                "value": 149554,
                "label": "Leeman"
            },
            {
                "value": 5998,
                "label": "Leeming"
            },
            {
                "value": 6003,
                "label": "Leinster"
            },
            {
                "value": 6009,
                "label": "Leonora"
            },
            {
                "value": 6012,
                "label": "Leschenault"
            },
            {
                "value": 6013,
                "label": "Lesmurdie"
            },
            {
                "value": 6036,
                "label": "Little Grove"
            },
            {
                "value": 6048,
                "label": "Lockridge"
            },
            {
                "value": 6049,
                "label": "Lockyer"
            },
            {
                "value": 6074,
                "label": "Lower Chittering"
            },
            {
                "value": 6076,
                "label": "Lower King"
            },
            {
                "value": 6092,
                "label": "Lynwood"
            },
            {
                "value": 6118,
                "label": "Maddington"
            },
            {
                "value": 6119,
                "label": "Madeley"
            },
            {
                "value": 6120,
                "label": "Madora Bay"
            },
            {
                "value": 6124,
                "label": "Maida Vale"
            },
            {
                "value": 149549,
                "label": "Malaga"
            },
            {
                "value": 6143,
                "label": "Mandurah"
            },
            {
                "value": 6144,
                "label": "Mandurah city centre"
            },
            {
                "value": 6150,
                "label": "Manjimup"
            },
            {
                "value": 6155,
                "label": "Manning"
            },
            {
                "value": 6167,
                "label": "Marangaroo"
            },
            {
                "value": 6171,
                "label": "Marble Bar"
            },
            {
                "value": 6176,
                "label": "Margaret River"
            },
            {
                "value": 6185,
                "label": "Marmion"
            },
            {
                "value": 6195,
                "label": "Martin"
            },
            {
                "value": 6211,
                "label": "Maylands"
            },
            {
                "value": 6217,
                "label": "McKail"
            },
            {
                "value": 6225,
                "label": "Meadow Springs"
            },
            {
                "value": 6230,
                "label": "Medina"
            },
            {
                "value": 6233,
                "label": "Meekatharra"
            },
            {
                "value": 6242,
                "label": "Melville"
            },
            {
                "value": 6246,
                "label": "Menora"
            },
            {
                "value": 6248,
                "label": "Menzies"
            },
            {
                "value": 6259,
                "label": "Merredin"
            },
            {
                "value": 6262,
                "label": "Merriwa"
            },
            {
                "value": 6276,
                "label": "Middle Swan"
            },
            {
                "value": 6280,
                "label": "Midland"
            },
            {
                "value": 6281,
                "label": "Midvale"
            },
            {
                "value": 6289,
                "label": "Millars Well"
            },
            {
                "value": 6291,
                "label": "Millbridge"
            },
            {
                "value": 6306,
                "label": "Mindarie"
            },
            {
                "value": 6309,
                "label": "Mingenew"
            },
            {
                "value": 6313,
                "label": "Mira Mar"
            },
            {
                "value": 6317,
                "label": "Mirrabooka"
            },
            {
                "value": 6365,
                "label": "Moora"
            },
            {
                "value": 6377,
                "label": "Morawa"
            },
            {
                "value": 6385,
                "label": "Morley"
            },
            {
                "value": 6400,
                "label": "Mosman Park"
            },
            {
                "value": 6407,
                "label": "Mount Barker"
            },
            {
                "value": 6410,
                "label": "Mount Claremont"
            },
            {
                "value": 6425,
                "label": "Mount Hawthorn"
            },
            {
                "value": 6427,
                "label": "Mount Helena"
            },
            {
                "value": 6433,
                "label": "Mount Lawley"
            },
            {
                "value": 6439,
                "label": "Mount Magnet"
            },
            {
                "value": 6440,
                "label": "Mount Marshall"
            },
            {
                "value": 6442,
                "label": "Mount Melville"
            },
            {
                "value": 6444,
                "label": "Mount Nasura"
            },
            {
                "value": 6450,
                "label": "Mount Pleasant"
            },
            {
                "value": 6455,
                "label": "Mount Richon"
            },
            {
                "value": 6460,
                "label": "Mount Tarcoola"
            },
            {
                "value": 149551,
                "label": "Muchea"
            },
            {
                "value": 6473,
                "label": "Mukinbudin"
            },
            {
                "value": 6477,
                "label": "Mullaloo"
            },
            {
                "value": 6480,
                "label": "Mundaring"
            },
            {
                "value": 6481,
                "label": "Mundijong"
            },
            {
                "value": 6488,
                "label": "Munster"
            },
            {
                "value": 6490,
                "label": "Murchison"
            },
            {
                "value": 6491,
                "label": "Murdoch"
            },
            {
                "value": 6493,
                "label": "Murray"
            },
            {
                "value": 6504,
                "label": "Myaree"
            },
            {
                "value": 6519,
                "label": "Nannup"
            },
            {
                "value": 6528,
                "label": "Narembeen"
            },
            {
                "value": 6540,
                "label": "Narrogin"
            },
            {
                "value": 6546,
                "label": "Nedlands"
            },
            {
                "value": 6569,
                "label": "Newman"
            },
            {
                "value": 6581,
                "label": "Ngaanyatjarraku"
            },
            {
                "value": 6590,
                "label": "Nickol"
            },
            {
                "value": 6600,
                "label": "Nollamara"
            },
            {
                "value": 6604,
                "label": "Noranda"
            },
            {
                "value": 6616,
                "label": "North Beach"
            },
            {
                "value": 6624,
                "label": "North Coogee"
            },
            {
                "value": 6627,
                "label": "North Fremantle"
            },
            {
                "value": 6634,
                "label": "North Lake"
            },
            {
                "value": 6644,
                "label": "North Perth"
            },
            {
                "value": 6661,
                "label": "Northam"
            },
            {
                "value": 6662,
                "label": "Northampton Shire"
            },
            {
                "value": 6664,
                "label": "Northbridge"
            },
            {
                "value": 6682,
                "label": "Nullagine"
            },
            {
                "value": 6683,
                "label": "Nulsen"
            },
            {
                "value": 6687,
                "label": "Nungarin"
            },
            {
                "value": 6699,
                "label": "Oakford"
            },
            {
                "value": 6711,
                "label": "Ocean Reef"
            },
            {
                "value": 6726,
                "label": "Onslow"
            },
            {
                "value": 6730,
                "label": "Orana"
            },
            {
                "value": 6736,
                "label": "Orelia"
            },
            {
                "value": 6743,
                "label": "Osborne Park"
            },
            {
                "value": 6756,
                "label": "Padbury"
            },
            {
                "value": 6772,
                "label": "Palmyra"
            },
            {
                "value": 6779,
                "label": "Paraburdoo"
            },
            {
                "value": 6793,
                "label": "Parkerville"
            },
            {
                "value": 6802,
                "label": "Parkwood"
            },
            {
                "value": 6803,
                "label": "Parmelia"
            },
            {
                "value": 6819,
                "label": "Pearce"
            },
            {
                "value": 6822,
                "label": "Pearsall"
            },
            {
                "value": 6823,
                "label": "Pegs Creek"
            },
            {
                "value": 6825,
                "label": "Pemberton"
            },
            {
                "value": 6835,
                "label": "Peppermint Grove"
            },
            {
                "value": 6838,
                "label": "Perenjori"
            },
            {
                "value": 6840,
                "label": "Perth"
            },
            {
                "value": 6841,
                "label": "Perth city centre"
            },
            {
                "value": 6851,
                "label": "Piara Waters"
            },
            {
                "value": 6852,
                "label": "Piccadilly"
            },
            {
                "value": 6859,
                "label": "Pingelly"
            },
            {
                "value": 6860,
                "label": "Pinjarra"
            },
            {
                "value": 6865,
                "label": "Plantagenet Shire"
            },
            {
                "value": 6887,
                "label": "Port Denison"
            },
            {
                "value": 6892,
                "label": "Port Hedland"
            },
            {
                "value": 6894,
                "label": "Port Kennedy"
            },
            {
                "value": 6932,
                "label": "Quairading"
            },
            {
                "value": 6938,
                "label": "Queens Park"
            },
            {
                "value": 6947,
                "label": "Quindalup"
            },
            {
                "value": 6948,
                "label": "Quinns Rocks"
            },
            {
                "value": 6961,
                "label": "Rangeway"
            },
            {
                "value": 6969,
                "label": "Ravensthorpe"
            },
            {
                "value": 6971,
                "label": "Ravenswood"
            },
            {
                "value": 6981,
                "label": "Redcliffe"
            },
            {
                "value": 149558,
                "label": "Regans Ford"
            },
            {
                "value": 7013,
                "label": "Ridgewood"
            },
            {
                "value": 7026,
                "label": "Riverton"
            },
            {
                "value": 7027,
                "label": "Rivervale"
            },
            {
                "value": 7044,
                "label": "Rockingham"
            },
            {
                "value": 7045,
                "label": "Rockingham city centre"
            },
            {
                "value": 7049,
                "label": "Roebuck"
            },
            {
                "value": 7051,
                "label": "Roleystone"
            },
            {
                "value": 7079,
                "label": "Rossmoyne"
            },
            {
                "value": 7106,
                "label": "Safety Bay"
            },
            {
                "value": 7128,
                "label": "Salter Point"
            },
            {
                "value": 7130,
                "label": "Samson"
            },
            {
                "value": 7139,
                "label": "Sandstone"
            },
            {
                "value": 7149,
                "label": "Scarborough"
            },
            {
                "value": 7172,
                "label": "Secret Harbour"
            },
            {
                "value": 7181,
                "label": "Serpentine"
            },
            {
                "value": 7182,
                "label": "Serpentine-Jarrahdale"
            },
            {
                "value": 7188,
                "label": "Seville Grove"
            },
            {
                "value": 7192,
                "label": "Shark Bay"
            },
            {
                "value": 7199,
                "label": "Shelley"
            },
            {
                "value": 7202,
                "label": "Shenton Park"
            },
            {
                "value": 7208,
                "label": "Shoalwater"
            },
            {
                "value": 7214,
                "label": "Silver Sands"
            },
            {
                "value": 7217,
                "label": "Sinagra"
            },
            {
                "value": 7218,
                "label": "Singleton"
            },
            {
                "value": 7245,
                "label": "Somerville"
            },
            {
                "value": 7248,
                "label": "Sorrento"
            },
            {
                "value": 7254,
                "label": "South Bunbury"
            },
            {
                "value": 7256,
                "label": "South Carnarvon"
            },
            {
                "value": 7258,
                "label": "South Fremantle"
            },
            {
                "value": 7263,
                "label": "South Guildford"
            },
            {
                "value": 7264,
                "label": "South Hedland"
            },
            {
                "value": 7267,
                "label": "South Kalgoorlie"
            },
            {
                "value": 7271,
                "label": "South Lake"
            },
            {
                "value": 7281,
                "label": "South Perth"
            },
            {
                "value": 7291,
                "label": "South Yunderup"
            },
            {
                "value": 7297,
                "label": "Southern River"
            },
            {
                "value": 7300,
                "label": "Spalding"
            },
            {
                "value": 7301,
                "label": "Spearwood"
            },
            {
                "value": 7304,
                "label": "Spencer Park"
            },
            {
                "value": 7323,
                "label": "St George Ranges"
            },
            {
                "value": 7330,
                "label": "St James"
            },
            {
                "value": 7347,
                "label": "Stirling"
            },
            {
                "value": 7351,
                "label": "Stoneville"
            },
            {
                "value": 7356,
                "label": "Strathalbyn"
            },
            {
                "value": 7365,
                "label": "Stratton"
            },
            {
                "value": 7371,
                "label": "Subiaco"
            },
            {
                "value": 7372,
                "label": "Success"
            },
            {
                "value": 7383,
                "label": "Sunset Beach"
            },
            {
                "value": 7401,
                "label": "Swan"
            },
            {
                "value": 7403,
                "label": "Swan View"
            },
            {
                "value": 7404,
                "label": "Swanbourne"
            },
            {
                "value": 7424,
                "label": "Tammin"
            },
            {
                "value": 7433,
                "label": "Tapping"
            },
            {
                "value": 7436,
                "label": "Tarcoola Beach"
            },
            {
                "value": 7458,
                "label": "Telfer"
            },
            {
                "value": 7496,
                "label": "The Vines"
            },
            {
                "value": 7507,
                "label": "Thornlie"
            },
            {
                "value": 7509,
                "label": "Three Springs"
            },
            {
                "value": 7526,
                "label": "Tom Price"
            },
            {
                "value": 7530,
                "label": "Toodyay"
            },
            {
                "value": 7560,
                "label": "Trayning"
            },
            {
                "value": 7564,
                "label": "Trigg"
            },
            {
                "value": 7571,
                "label": "Tuart Hill"
            },
            {
                "value": 7594,
                "label": "Two Rocks"
            },
            {
                "value": 7609,
                "label": "Upper Gascoyne"
            },
            {
                "value": 7619,
                "label": "Usher"
            },
            {
                "value": 7620,
                "label": "Utakarra"
            },
            {
                "value": 7627,
                "label": "Vasse"
            },
            {
                "value": 7633,
                "label": "Victoria Park"
            },
            {
                "value": 7634,
                "label": "Victoria Plains"
            },
            {
                "value": 7638,
                "label": "Vincent"
            },
            {
                "value": 7645,
                "label": "Viveash"
            },
            {
                "value": 7653,
                "label": "Waggrakine"
            },
            {
                "value": 7654,
                "label": "Wagin"
            },
            {
                "value": 7658,
                "label": "Waikiki"
            },
            {
                "value": 7682,
                "label": "Wandering"
            },
            {
                "value": 7683,
                "label": "Wandi"
            },
            {
                "value": 7685,
                "label": "Wandina"
            },
            {
                "value": 7691,
                "label": "Wannanup"
            },
            {
                "value": 7692,
                "label": "Wanneroo"
            },
            {
                "value": 7706,
                "label": "Warnbro"
            },
            {
                "value": 7709,
                "label": "Waroona"
            },
            {
                "value": 7726,
                "label": "Warwick"
            },
            {
                "value": 7729,
                "label": "Waterford"
            },
            {
                "value": 7732,
                "label": "Watermans Bay"
            },
            {
                "value": 7739,
                "label": "Wattle Grove"
            },
            {
                "value": 7755,
                "label": "Wellard"
            },
            {
                "value": 7760,
                "label": "Wembley"
            },
            {
                "value": 7761,
                "label": "Wembley Downs"
            },
            {
                "value": 7776,
                "label": "West Arthur"
            },
            {
                "value": 7780,
                "label": "West Beach"
            },
            {
                "value": 7781,
                "label": "West Busselton"
            },
            {
                "value": 7795,
                "label": "West Lamington"
            },
            {
                "value": 7797,
                "label": "West Leederville"
            },
            {
                "value": 7803,
                "label": "West Perth"
            },
            {
                "value": 7826,
                "label": "Westminster"
            },
            {
                "value": 7828,
                "label": "Westonia"
            },
            {
                "value": 7833,
                "label": "White Gum Valley"
            },
            {
                "value": 7848,
                "label": "Wickepin"
            },
            {
                "value": 7850,
                "label": "Wickham"
            },
            {
                "value": 7853,
                "label": "Willagee"
            },
            {
                "value": 7855,
                "label": "Willetton"
            },
            {
                "value": 7856,
                "label": "Williams"
            },
            {
                "value": 7868,
                "label": "Wilson"
            },
            {
                "value": 7873,
                "label": "Wiluna"
            },
            {
                "value": 7889,
                "label": "Winthrop"
            },
            {
                "value": 7893,
                "label": "Withers"
            },
            {
                "value": 7907,
                "label": "Wongan-Ballidu"
            },
            {
                "value": 7910,
                "label": "Wonthella"
            },
            {
                "value": 7911,
                "label": "Woodanilling"
            },
            {
                "value": 7914,
                "label": "Woodbridge"
            },
            {
                "value": 149553,
                "label": "Woodridge"
            },
            {
                "value": 7927,
                "label": "Woodvale"
            },
            {
                "value": 7947,
                "label": "Wooroloo"
            },
            {
                "value": 7948,
                "label": "Woorree"
            },
            {
                "value": 7961,
                "label": "Wundowie"
            },
            {
                "value": 7966,
                "label": "Wyalkatchem"
            },
            {
                "value": 7971,
                "label": "Wyndham-East Kimberley"
            },
            {
                "value": 7982,
                "label": "Yakamia"
            },
            {
                "value": 7983,
                "label": "Yalgoo"
            },
            {
                "value": 7985,
                "label": "Yallingup"
            },
            {
                "value": 7987,
                "label": "Yalyalup"
            },
            {
                "value": 7990,
                "label": "Yanchep"
            },
            {
                "value": 7992,
                "label": "Yangebup"
            },
            {
                "value": 8022,
                "label": "Yilgarn"
            },
            {
                "value": 8023,
                "label": "Yokine"
            },
            {
                "value": 8025,
                "label": "York"
            }
        ]
    }
]   

export default cities