# InvestPlan

Used for find info from investment plan

**URL** : `/api/saving`

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
    "value":17000,
    "multi":10
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "fifteenYear": 7129744.5,
    "oneYear": 224400,
    "twentyFiveYear": 22069080,
    "fortyYear": 99317760,
    "twentyYear": 12852509,
    "thrityYear": 36912452,
    "tenYear": 3576357.8,
    "leverage": 10,
    "fiveYear": 1369984.4,
    "thrityFiveYear": 60817856
}
```
