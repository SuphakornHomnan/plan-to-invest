# RetirePlan

Used for find amount year that live on and total assets

**URL** : `/api/retire`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "nowAge": "[your age now]",
    "retireAge": "[your reitre age]",
    "dieAge": "[your die age]",
    "assetPerMonth": "[your money that you must use per month]"
}
```

**Data example**

```json
{
    "nowAge": 30,
    "retireAge": 50,
    "dieAge": 80,
    "assetPerMonth": 17000
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "liveOnAge": 30,
    "totalAsset": 6120000
}
```
