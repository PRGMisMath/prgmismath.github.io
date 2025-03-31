var plane_types = [
    {
        "nom":"A400M Atlas PARA 5-29",
        "pt_nom":"A400M 5-29",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "apparence":"10023004,10023000*2,10023004*15,R0023004,R002300R,R000000R,<000000>",
        "paras":[18,20,20,17],
        "vit":65,
        "isA400M":true,
        "part":{
            "cat":"A400M Atlas",
            "type":"5-29",
            "spec":""
        }
    },
    {
        "nom":"A400M Atlas PARA 6-29",
        "pt_nom":"A400M 6-29",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "apparence":"10023004,10023000*2,10023004*18,00023000,000R3000,000RR000,<00RR00>",
        "paras":[21,22,23,19],
        "vit":65,
        "isA400M":true,
        "part":{
            "cat":"A400M Atlas",
            "type":"6-29",
            "spec":""
        }
    },
    {
        "nom":"A400M Atlas PARA 5-25",
        "pt_nom":"A400M 5-25",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "apparence":"10023004*2,10023000,10023004*17,10000004,R0000004,R000000R*2,<000000>",
        "paras":[21,20,20,21],
        "vit":65,
        "isA400M":true,
        "part":{
            "cat":"A400M Atlas",
            "type":"5-25",
            "spec":""
        }
    },
    {
        "nom":"A400M Atlas PARA 6-25",
        "pt_nom":"A400M 6-25",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "apparence":"10023004*2,10023000,10023004*19,100R3004,100RR004,<00RR00>",
        "paras":[24,22,23,23],
        "vit":65,
        "isA400M":true,
        "part":{
            "cat":"A400M Atlas",
            "type":"6-25",
            "spec":""
        }
    },

    {
        "nom": "Casa CN235-200",
        "apparence":"1002*14,R00R,<00>,R00R",
        "format":{
            "cables":"AD",
            "portes":[[1],[2]]
        },
        "isA400M":false,
        "paras":[14,14],
        "vit":55,
        "pt_nom": "Casa 200",
        "part":{
            "cat":"Casa CN325",
            "type":"200",
            "spec":"Non équipés (jusqu'à MTE 110)"
        }
    },
    {
        "nom": "Casa CN235-200",
        "apparence":"1002*13,R00R,<00>,R00R",
        "format":{
            "cables":"AD",
            "portes":[[1],[2]]
        },
        "isA400M":false,
        "paras":[13,13],
        "vit":55,
        "pt_nom": "Casa 200",
        "part":{
            "cat":"Casa CN325",
            "type":"200",
            "spec":"Gaine EL110 jusqu'à 130"
        }
    },
    {
        "nom": "Casa CN235-200",
        "apparence":"1002*12,R00R,<00>,R00R",
        "format":{
            "cables":"AD",
            "portes":[[1],[2]]
        },
        "isA400M":false,
        "paras":[12,12],
        "vit":55,
        "pt_nom": "Casa 200",
        "part":{
            "cat":"Casa CN325",
            "type":"200",
            "spec":"Gaine EL110 au-delà 130"
        }
    },

    {
        "nom": "Casa CN235-300",
        "apparence":"1002*14,R00R,<00>,R00R",
        "format":{
            "cables":"AD",
            "portes":[[1],[2]]
        },
        "isA400M":false,
        "paras":[14,14],
        "vit":55,
        "pt_nom": "Casa 300",
        "part":{
            "cat":"Casa CN325",
            "type":"300",
            "spec":"Non équipés (jusqu'à MTE 110)"
        }
    },
    {
        "nom": "Casa CN235-300",
        "apparence":"1002*13,R00R,<00>,R00R",
        "format":{
            "cables":"AD",
            "portes":[[1],[2]]
        },
        "isA400M":false,
        "paras":[13,13],
        "vit":55,
        "pt_nom": "Casa 300",
        "part":{
            "cat":"Casa CN325",
            "type":"300",
            "spec":"Gaine EL110 jusqu'à 130"
        }
    },

    {
        "nom":"Hercules KC130J",
        "pt_nom":"KC130J",
        "apparence":"10000004,1002R004*2,10023004*7,X0023004,X002300X*9,R0023004,R002300R*3,<002300>",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "isA400M":false,
        "paras":[10,24,22,12],
        "vit":55,
        "part":{
            "cat":"Hercules C130J",
            "type":"KC130J",
            "spec":"Non équipés"
        }
    },
    {
        "nom":"Hercules KC130J",
        "pt_nom":"KC130J",
        "apparence":"X0000004,X002R004,X002R00X,X002300X*17,R002300X,R002300R*3,<002300>",
        "format":{
            "cables":"ABCD",
            "portes":[[2,1],[3,4]]
        },
        "isA400M":false,
        "paras":[0,24,22,2],
        "vit":55,
        "part":{
            "cat":"Hercules C130J",
            "type":"KC130J",
            "spec":"Gaine EL110"
        }
    },
    {
        "nom":"Hercules C130 J30",
        "pt_nom":"C130 J30",
        "apparence":"00000004,1002R004*2,10023004*12,X0023004,X002300X*8,10023004*3,10000004,<000000>",
        "format":{
            "cables":"ABCD",
            "portes":[[1,2],[4,3]]
        },
        "isA400M":false,
        "paras":[18,26,24,20],
        "vit":55,
        "part":{
            "cat":"Hercules C130J",
            "type":"C130 J30",
            "spec":"Non équipés"
        }
    },
    {
        "nom":"Hercules C130 J30",
        "pt_nom":"C130 J30",
        "apparence":"00000004,X002R004,X002R00X,X002300X*21,X002300X*3,X000000X,<000000>",
        "format":{
            "cables":"ABCD",
            "portes":[[2,1],[3,4]]
        },
        "isA400M":false,
        "paras":[0,26,24,2],
        "vit":55,
        "part":{
            "cat":"Hercules C130J",
            "type":"C130 J30",
            "spec":"Gaine EL110"
        }
    }
];