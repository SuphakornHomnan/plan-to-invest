# RetirePlan

Used for find retirement plan

**URL** : `/retire`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "nowAge": "[your age at present]",
    "retireAge": "[your age that you think you will retire]",
    "asset": "[Total asset that you want when you retired]"
}
```

**Data example**

```json
{
    "nowAge": 20,
    "retireAge": 50,
    "asset": 1000000
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "savingMoney": 2777.7778,
    "_id": 467166901
}
```
