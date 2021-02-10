# InvestPlan

Used for find investment plan

**URL** : `/saving`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "value": "[your saving per month]",
    "multi": "[your rate of return]"
}
```

**Data example**

```json
{
    "value": 10000,
    "multi": 10
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "oneYear": 132000,
    "thrityYear": 21713208,
    "tenYear": 2103740,
    "leverage": 10,
    "fiveYear": 805873.2,
    "threeYear": 436920
}
```
