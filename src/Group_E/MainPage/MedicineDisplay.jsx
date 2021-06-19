import '../assets/css/BasicInformation.css'
import { Card, Carousel, Row, Col, Divider } from 'antd';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';
const { Meta } = Card;



const defaultUrl = 'http://10.112.196.176:5003';



var medicineData = [];

medicineData.push({

    href: '#',
    title: `通脉片`,
    description: '四川省通园制药有限公司',
    content: '通脉片，具有活血通脉的功能。用于缺血性心脑疾病,动脉硬化,脑血栓，脑缺血,冠心病,心绞痛。',
    medlink: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGRYYGhgcGRkaHBwcGRoZGhwaHBkaHhwcIS4lHCErHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQjJSs0NDQ0NTQxMTY0NDE0PTE0MTE0NjY0NDE0NDU2NDY0NDQ0NDQxNDQ0NDQ0NDY0PTQ0Mf/AABEIAL4BCQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xABBEAACAQIEAgYGBwcEAgMAAAABAgADEQQSITEFQQYiUWFxgRMyQpGhsRQzUnKywdEHFSNikuHwU3OC8XWiJUNj/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQGBf/EACsRAAIBAwMCBQQDAQAAAAAAAAABAgMRMQQSIUFRM2FxgaEFIjJCE5GxFf/aAAwDAQACEQMRAD8A7NCEJAEIQgBCEIAQhPIB7CE8gHsIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCUBCEJAEIQgBCM1ayrqzAeJlbi+OoguNu1jlX3mAW8YrYhV9YgfP3TB8T6dILhWLHsp6D+o/lM6/HMXiCfRJkXtAufN2/K0eb4OMq8E7Ll9kdKxfSGmm9rdrMF9142nSakezyZTOdUujLv161S57FIZte8mwl1w3g1JNqJBHtOQxPh/1I5djUHUk+Y2XybZeNofZf3A/nHF4vSPMjxUzJYmmm7KST2Bjt4bCK+lIFvew2Ghv5CLnayNcvFKR9seYIjox1M+2vvnP2xQuWUvodczCx8hy7riKao4LFqwA5BQrkeVhbzvFxY6CMQp2ZfeIvOO0TnmHxTlmBUt2BQo89+/timxzKTd6ensgtnHjraLksdDhMGnEibBc5Y8rkD+raODi9RWCksp5nNcCLixuYTEHpGRtVLC9rjKRfxMmUeOVG2J05soAPhFxY1cJll6RkXuUNtzla3vvH6XSBmFwqkdoJHzi4saGEok6RKfZU23s4/SPJxxD7LeRB/OW4sXEJV/vlOYYeUcHFqX2j7jAsWEJDXiVI+2I4MZTOzr74ISIRoVlOzD3iOAwD2EIQAhCEoCEISAYr1CLZRmJ2F7bd8q8TUxJ2XKP5bE+8y2qesvn8pW8a4v9HydQvmz6AgHqrmsL7k6ACVJvhC9ihx2DrMNC6H7WTOfje0zWL6MO7XfEs3bnBv8AE2m/p8fpmkKpV7FstgpPW567AA3BJIAIi8Nxyg4PXClQGIawOVvVYdqk6XHMWja0YnCM8q/uYLD9H0T1UDtf1nIbTtCaD33khqLm2ZWtcGwuFAGwsptv2TZ1eI4YkKAlRmZQAihz1rdbQaqAwJI2vJrcNpH2APC4+RmXHnk3FRirJW9DAb70E0ub9YW7L3GpjatYAs5INzZbrc66Xvt+k3x4PT5Zh5/rGX4Ep9o+YBixq5jcJVd19cAXOmfU+ZJJP+WjJw3Jgq3Ym25A8gL7c7zWVOjCkhrUyRsSguPA8p63B6g2KnzI/KLFujMYBlDkEBi2x3HxYnlHXwpJP8Gidb9h8T1ZeNwuqPYv4FYxVwDe1Tbxyn5rICrOHABtRP8AxaxPxFhFPhlZQzB1tfqqfnbeSRhVX2Sv9Q89ecS9G5uHcbaAi2nlzgEE0FIGrr95FuF8h1RGUwtM+q62GwKlQLbnQjMdpbujZbK1m7SL/CMMlbSzIfFTfwGukAg/RbnKKiEg30c5r+82G89q4Os4sxDA7DMpVR5pqdtZIem9taVJjflpoDpqRrHxhEPWZAGO9r+PLv1gESlhSgOaixNtCpAJPYACAPGPJUC3X0TgHf2h8SY4uAQAgZxm3Od83kSdINhWvcVHHYLgr5gjWAV1SlSIa7Ou/rU1tfmQuWxO0mLh2KgCscltRlAPvFssdFGoNqvmUF/DS0Ui1L6shHgQT+kAitSp5epUsB/+jAX7Cb3+MkFqhtlyZft5rk9pAtb4xyphkb1kRtb6qDqdzrz0jgVVHJVHkB+kAb9G+lnPfcAk/pHQJSY7pJSS4Trt3aL/AFc/KZrH8Yq1tGey/YXRfPt85VFs4zrRh5mrx/HqNO4Bzt9ldfedhMzxDj9aoCA2RPsoSCfFtzKuJbYzaikeSdeUvI71wv6mn9xPwiS5E4X9TT+4n4RJcye1YPYQhKUIQhIBqp6y+fyicThkcWdVYDbMAbHtF9oqp6y+fyjsoI2GwiUwVRQqkkkDa53Nu+Rf3NRyPTy9V2zubnMz3BzE8z1R7pAxPSE0sV9GqUHOdC9F6fWVwvrI17ZHBG1yCCNRtKzEftCpJX+jnC4z0tgzKKSkqh9qwe5HgDF2SxbcO6NUqFYVkLXCstjrocoAv3BAJfRijXV1Dj1SARcFTY9oaxHgYxjeLUKLItWtTRqmiB3VS5uBZbnU3I27YbbyErE+EISFCEIQAhCEAIy+HQ7op8QI9CAUXF+EUmUtm9CRsynKLna4Oh1mKx1WvQYK1QMCLowKsrjtH6To2PwYrIUJIBtcjfQ3lRV6LU2IuxICqoBAOgzXPic2/dNxaWVc81ajKavFtPyfBi04zUG+U+X6R5eOtzRfIkSLxXorUwxUGoDTzEq2o0+wRffvvr8JAOHcjqut763Om52uNrWnTbFq9j86VXUU5bd/9l8nHV5ofIiPLxqnzDjyv8jMt6Kuo6yg6crH2T39toU6rFrFbDXXXlJ/HFh63URy0zXJxWifbt4gj8o6MdTtf0iWHPMPzmTjGNHUb/OYkdFWyap/VJuSUkuS6x/ShF0pLnP2jovlzMzWO4jUrHruSOSjRR5SLJGHwTv6q6dp0H95iyR6pVJ1Hb4RHj2Hwrv6qk9+wHnLnDcIRdX659y+6TXdUGpCqPITLl2OsNK3zJ2K7DcHUaucx7BoP7yHxtArgAADJsPOWDcSzNkpgE2uWY5QFG5sdf8ANpA44wLgjUFP1ki22brQjGn9qO0cL+pp/cT8IkuROF/U0/uJ+ESXKdVg9hCEpQhCEgGqnrL5/KOxqp6y+fyjsoMNx7DihiKtSpiG+j1aTO2HQsKoekAWqU2DDItgt9RcnvmEw+PpHiH0tcTiqOGOGGXEOhZ8wIBp3dGDDwvtoZp+J8KJq8RrvXWpUek1LDIWAZEKgsoBtbrXHfa/OVtSpiF4F9HbCVNKRXOrI2Xrk3Zb5h4AGDO5PDNfxusW4RXcVzWzUKjLVChSykEqbLtpznMcJTe1CqK1TPS4bWxKFiGyujHqjODZTbXn2ETeYnEpT6PLnYLmwaIubS7tTGVfEzB4GuhpgB1JHBsSp6w0bMeqe/ug0avonxrF1OI0KdXEs6VMIKxTKirmOwsByve++glz0p4pkxmHXDY2lTrZwlahUY2em1iDlsbMNbHS+bnaZroYP/lMJ/4xPnL/AKfgfTuFWtmOIa/bayQCl450trUCRhsd6YFzSGdKRKVc1slQWRlTXRxm2Onbvuitaq1AenxFGvVBIZqQAUcsuh1Oh1sPCcTTDuzkhXZDxOso6lJ0L5dgr2Zmt7JOS3fOgfsYQDD4rSx+l1B6oXZE0sNra6coAjhP7R6rvSWphVC1a9WkKgqZUAp2LNlYE3A1OomnwXSdXxZwhpi5QulRHV6bIDbW1ird1j4zjPBVJrYYUm/inF4rq1Q7Ye2XTQWuT1gbHsvHOC8XrfS1q0qVGnXxGGaknokFNFqVHKU6hBJAOZdT8IB9A1qqqrMxAVQSxOwAFyT5SPQ4nRemayVUakASagIKALuc22krsfRqJw+qtWp6SouHqh3sFzN6NrmygAe6c86C4bGVuENRoLh2pVVrp12dailyysTYFTqSQLCAdaw2ISoodGV1OzKQQfMR6c/6IU8Zw7CJh3wTVsjOc9GohvmZm9VytrXtvym9ptcA2IuAbHcdxkAzjcItVCjC4I93YR3zmuKwbUqjo4Gh/qHJh4idSmU6b4MFRV7Oq3huvxv750hKzseHW0VKG5ZRjadMgE3NxyO1onqMeYJ90fJt22AvbtjRdWF2FteXOdj8VpLgYdCDaRsZ6jf5zlnVdgdBpIfEkBpswsNBceYhvgRglNW7oj8EoKxYsoJXLa/K9/0lvVrKguxAH+bCUeAqslOoymxGTW4Ft+baCRFR6h0zOediVT/k/rN/xy+M8ksn0tCygi0xHGCSVpqSRztc+7ZfFjKpneo27O32UP4qliAO5FJ/mEkphEXqu2cjX0dMBUXxtoPE3PfG6nEr9SmM3LJS0F+xqhvfvtfwkOxJwmGKXzNTzW9T2V1HXY6kkabkk35RPGz1l29Qbbc9pHwJYsys6lgt/R072XrDrO+rE+JG50G4kcaHWXQD+GNBtz2lWTjqPDO08L+pp/cT8IkuROF/U0/uJ+ESXKaWD2EISlCEISAaqesvn8o7GqnrL5/KOygr6uFYsTcFSynKdRltYixHbrILcKXKCaKFvaIVQTruCtjtL2EXMuKeUZ58CFGnplAJFhUcjLybK+YAd1pAxHRrD1CxanRcgkXqUKLE9XNcMiq1rDtmwiSoO4i5Ni6cehh8F0UoUXXE0qSo62ysj16Yy/ZK5mUodOrtJeL4PSqVXrVcOHq1EVMy1BmQLezU82Uo17HMLG6i01DYdSCuUWNrgabbbRFXCK19xmtmtzttFxtfRs5rV6OYikMirSq0xUNUCvQbP6QjKzs+HazOV0JIPbaW/QzLg6FWm60aLs7Oqio5LuVAzFqwFr2Atyt3zYnBC9wSDrcjne9vMX0MT9HcCwbTKBub3vqdb8oFpdGcsbglanVwFDDoajI1eq9ZbNRz1lNyWX1QpIFjqQBK5uAipi62Dw4fNh8AqqzKVYYim4dTfYFi1wQfa02nV34QrFs1Gk9wuVsijX2iecaXAgBQFqpo2bK9RVBXawuRYwLy7DGPxbrwqpUxJUVPorl7AqMzUzpY7EkgW7ZQdBOg1H6DSOJokV2DMWVqlNwGJKglGBuBaaOpQZkQs7lbqVDhHGa/VNioNwdbmShXrBiBUptlBOqFbgb2IY390Dc+zMH+yBSMRxFMzladRFQMzNYZ64O51Jyrc76Tqs51w/hjcP8ApNfDgO+IqIzICW1zuSoXKG19I3hlE2vC8W9VAz0mpH7LWv5W1t42MWIqib2839CwlJ0sA+jPftW3jcS5LAC50mH6acUDhaanq3v425+EsVeSOeqmo0pN9jOu4HW1B+EbSqGIUgAfnGVcjYxVwd9D28vPsnpsfO77klFYMeSjlykHGIPRufd369klU0J0JvbdSYzxI/w2AFh/cTLwdIK8k33IOAI9HULAEDISCco57nlIz8RNTqUxnHIJ1KXf1rXfyB8o5h0zUaoyBzdLIdibm19D47Svc5yVZjVt61KlYU1t/qPfL/Ux22G080sn0dDw0JaznK7Gqb29FS0pA9jEaMfvFj3RbXJyMxBt9RQ9a3Y7ixA8Sq9wialUL1Gblb0OHuNOx3sGy/0r4z1EbJl6tKmNclOw82ba/fqe+ZOxKwdlJQhEGW4pplZj1l1ZiMttRoFtcjUyVxoWZRa3UGnZvI3DMKNWSmxXfPbRm01LEguOd7275J40bspNr5Bttz2lWThqPDO08L+pp/cT8IkuROF/U0/uJ+ESXKbWD2EISlCEISAZc6r5/KOyk6S11RELMFGe1z25W/SU9HHfYqe5pbGN8b2vybSEyycSqDZyfGxjy8YqDfKfL9INmjhKFeNtzVfIkR1eODmh8iJAXMJUjjafZb4frF/vmn2P7v7wCzhK398U/wCb3Q/fFP8Am90AsoSs/fNPsf3f3iG42nJWPuH5wC0Kg7gGNPhlNrqNAQO4HeVL8cPJB5m/yEYqcWqHYhfAfrKC9FMAluZABPhtI2I4oi6A5j2D9dpmcVxAa56l+dr3+AlNieN8qa/8m/ITSi2eerqaVLL9upf8V4zcdZgAdlHOZGu5qVC1/wDochGnzucxuxPOSMNTKg33nWMdp+PqNTLUSStZIZxFILa0Ykl8O5NyRBcJ2mbueSUG3wrDaG9gdxt+kRxA3pM21+XbqI9WKgWG45jlIvEm6h7CL+8i8ksHSn9sks8orkA9BWuhcdTqXtm1OhNxp2yCyuVAdlRBslPqqP8Alp8APEyywi3pVBe2qahS53OyjUmISjlO2Q8i2WpXPgg6lL4meWWT6Wh4aItOjlUWVaaHZnBGY/yIOvUPlr2yStACxIt2NUAZz3pQU2TuLm47Il8aqMQgJqbHKc9U9zVG6qb7adwgmFqNq7Ckp1KoSXP3nNmPlkHfMnUk0yjOyMpdyuoZs1S1xqwGiJe1xYeBnnG/WXS3UGnZvpPMA1FWyU1PacmpbXYtcDW99L7b8ocaN2U2t1BodxvKsnHUfgdq4X9TT+4n4RJcicL+pp/cT8IkuU0sHsIQlKEIQkBk/wBoH1FP/cH4XmCtN7+0D6in/uD8LzBz0U/xPnvqPjv0QtKrDZmHmY8nEao2dvnI0JuyPJGrNYk17k9eMVR7QPioji8cqc1Q+RH5yshJtj2Oq1dZfs/7Lccebmi/1H9Ioce7af8A7f2lNCTZHsaWurr9vgu/38P9M/1D9J5+/h/pn+r+0pYSbEa/6Ffv8FyePHlTHm39o23HX5Ig95lVCXZHsZetrv8Ab4LapxSpdQCBe2w7Yy+ILEqzMST293dGUUFVB7/+o4ddQRe25GtucbUjTq1JZk37kdEINjzB84U9FLW1vbwjulgATpqCflGywF/strNHCyQ2HYm1zcxdWodgdufaYguBounfz/tEAQY3NK1xXpD2mCAsbXjiAAAm1/iIVn215X5b+UF6XbHQABY7bf3/AM7JB4gP4Z8x8RHGYneJxq/wj92/vI/KR4OlN7pK3kQsG7ClVKqzN1LBTlJuTzsbe6MDBsQTWcU05pT0/rcnMx8SB3R/COy0qpW1+pubDne5uPmJASi1Q7tUI7DkpqPvADKPuAfeM8ssn0tDw0SExKp1KCDQcuQ72ABt90KP5pHyvUNiS53ypYL5vYhR4Bm/mkujgweqbuf9OmMtNfHt8WzHvlrS4eSLOQq/Yp6Dzbc+d5k7FXh6TJcZhmIsUQGyi+pL3vew3LHyjvHPWGt+oNe3eWuIpU1QqTkU/ZNif1+Mo+J4hXa6XyhbC/dLHJ59RJbbX5O38L+pp/cT8IkuROF/U0/uJ+ESXNHRYPYQhBQhCEgMn+0D6in/ALg/C8wV5vf2g/U0/wDdH4XmMwOM9HfqKwa1we6/6z0Qwfga9J12m7cIjQk309EplKENnJzDmttv6r+UkfRsO7IFqFAwObMbZTrbfS3nNXPGqV8NFVCJqXF7akXt3xiriCvsk9/qr5ltpqzeCQpuTtexJhG61TKoNuY8r7xCYkEXsd7efeeUtnkfxyaukPwja1lPMdljobxSsDsbyWMuMo5QqEIQQfogMMp5G/lzjy5SbAart2SLRfKbnwkjMFAI1Gtj48jMs7QasejNrdrk6WGwvzM8dAbjSw302PbFquh0te3hrzEbWxuq3vzPbBpkcpY2P+CSAoA20B+B1B74yrkCxFx/mxnpUECzW7j+spzVlgbe19DeeRz0J7V94hkUbtfuH6wZ2sTTS57hvPeIj+G++oGnZYjT3RymxYiwAUa/9xviRPo31BBt5aiSWDvRSTXqQeG08yVFy5tU6pNhpfnJ9Ph9wM7afYTqoPdue/fvkHhOKRA5c2vlsOZ32E9xPGGOiDKO3c/2nkabZ9BTqxjTV2Wz1EprY5VHIDn5DeVeJ4wTogt3nf3SqZiTckknmd4TSijjPUylxHg9dyxuxJPadYhtjFRLbGaPOzvXC/qaf3E/CJLkThf1NP7ifhElzB+msHsIQlKEIQkAxXw6OLOoYdjAH5yqxHRjDN/9YB/lJX5S7haVNrBzlThP8kmZHEdB6Z9Sq69xAYfkfjKvEdC649RkYd91PyI+M6FPJtTaPPLQ0ZdLehyyv0exK70WPetmH/qZXVaLLo6MO3MCPnOyRL01O4B8ReVVX2PNL6XD9ZNevJxZaQAIF7HvuB4X2gKZGxGvd+k6ziOBYd/WopftAsfeJVYjoXQb1WdD3Nce5gZ0VZdTjLQVlhpnN3oXABUWHYbHXc67xr0BXYsNSdr72G48Ju6/Qdx6lZT3MpHxBPylbX6LYlfYDfdYH4Gxm1VXc4ulqI5i/wDTL53A0YH5/GOGs4v1b9lvKWGI4fUT16TjxU/ORci375dyZwlLm0o29hlcWLgEEXj9LGKNzoeRiTT7/frEPQvyFvj/AJpH2sidO/HBOsCLoTprYxaHMCQMrdvbIyMQbiSEr5uqbC/OZIpJ5FFiMq2058wZ4iAFhfTs8djPAHQW0IE9oKbFjqT8pDa5aR6FXS40G3f4xKpYsxAJGwntj3+PxnlQlTmGx3vBH3PQ+l1XfRhbSR8egWm4vqQNPOPel0ARbaxriuXI32rD5iR4Nwack/NFBCEJxP0QhCeXgHsS+xmh4P0QxNexy+jQ+04I07k3Pw8Zv+C9DcNh7MV9JUHtvY2P8q7L8++LnWFGUvIu+F/U0/uJ+ESXPBPZg96CEISgIQhIAhCEAIQhACEIQAhCEAIQhAEkSJiOGUX9ekjeKiTJ5KZcU8ooMR0RwzbKU+6x+RuPhKzEdBx7FY+DqD8Vt8ps4TSlJdThPSUZZijnOI6H4hfVyN4Gx+MrK/BcQnrUW8QMw+E6zC0qqM80vplJ4bRxwVGQ63Hc1x8DHAqnVWy35TrNbDo4syhh2EA/OVdfozhX3ohT2rdPwm00qiOMvps1+LT9Tn/Wve36e+IdPtPp2TZ1uhtO1qdV17jZh+sq8R0Kqj1ait43U/nNKUTjPSVo9L+5nWxJGi7SFjmujE/5qJeYjo5iU3pFh2oQ3w3lPxDDOqlWR1Y2ABVgSbjQC2sratweZQqRmtya5XQpYTVcF6D4itZqn8FP5hdyO5eXnN7wboxh8NqiZn5u3Wby5L5WnG5+zGhKXkc94N0LxFezMPRIfaYdYjuTf32m94L0Sw+HsQmeoPbexN+4bL5CaGEzc9MaUYhPYQkOoQhCAEIQlAQhCQBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIB5C09hACEIQAhCEAIQhACEIQAhCEoP/2Q==',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `藿香正气口服液`,
    description: '太极集团重庆涪陵制药厂有限公司',
    content: '藿香正气口服液，主要功效为治疗一些外感风寒以及夏天中暑所导致的一些感冒，表现为患者会出现一些头晕、头疼以及胸闷、呕吐的情况。',
    medlink: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4193664057,4089429213&fm=224&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `元胡止痛片`,
    description: '广西天天乐药业股份有限公司',
    content: '元胡止痛片，功能主治为理气,活血，止痛。用于气滞血瘀所致的胃痛,胁痛,头痛及痛经。',
    medlink: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1120831767,1633370287&fm=26&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `沙参止咳糖浆`,
    description: '京都念慈莓羹麽股伤份有限公司',
    content: '沙参止咳糖浆，主治肺热燥咳、潮热久咳、干咳、咳血、咳痰困难等气阴两虚之症。',
    medlink: 'http://5b0988e595225.cdn.sohucs.com/images/20190110/1eb800af83e34549a34395efb90b8f17.jpeg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `999感冒灵胶囊`,
    description: '三九医药',
    content: '用于感冒引起的头痛,发热,鼻塞,流涕,咽痛。',
    medlink: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=646111438,2664596244&fm=224&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})

class MedicineDisplay extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            dataSource:[],
        }
    }

    componentDidMount() {
      
        const dataSource =[];
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            transformRequest: [function(data) {
                data = JSON.stringify(data)
                console.log(data)
                return data
            }],
            baseURL:defaultUrl,
            method: 'post',
            url: '/api/recom',
            data: {
                'n': 10,
            }
        }).then(res=>
        {
           console.log(res.data)
           
            for(let i=0;i<res.data.length;i++){
                axios({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                       // console.log(data)
                        return data
                    }],
                    baseURL:defaultUrl,
                    method: 'post',
                    url: '/api/medicine-images',
                    data: {
                        'medicineID': res.data[i].medicineID,
                    }
                }).then(res1=>{
                    //console.log(res1);
                    res.data[i].medicineImages = res1.data;
                        this.setState({
                            dataSource: res.data,
                        })

                        // dataSource["medicineNameAlias"] = res.data.medicineNameAlias;
                        // dataSource["medicineIngre"]= res.data.medicineIngre;
                      
            
                });

                
            }
            this.setState({
                dataSource:res.data
            })
           
            console.log(this.state.dataSource)
        }
      
        
        )
      //  console.log(dataSource,4)
       
     }
    

    render(){
        return (
            <Col span={10}>
                            <div className="rightPart" align="left">
                                <div className="rightPartTitle" align="center">药房速览</div>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        onChange: page => {
                                            console.log(page);
                                            
                                        },
                                        pageSize: 5,
                                    }}
                                     dataSource={this.state.dataSource}
                                 //   dataSource={medicineData}
                                    
                                    renderItem=
                                    {
                                        item => (<List.Item
                                            key={item.title}
                                            extra={
                                                <Link to='#'>
                                                    <img
                                                        width={150}
                                                        height={150}
                                                        alt="药品图像"
                                                       // src={item.medlink}
                                                       src={"data:image/png;base64,"+item.medicineImages}
                                                    />
                                                </Link>
                                            }
                                        >
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.medicineNameZh}</a>}
                                                description={item.medicineProducer}
                                            ></List.Item.Meta>
                                            {item.medicineMainFunction}
                                        </List.Item>)
                                    }>

                                </List>
                            </div>

                        </Col>
        )
    }
}
export default MedicineDisplay;