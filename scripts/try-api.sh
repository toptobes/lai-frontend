# shellcheck disable=SC2086
# shellcheck disable=SC2068
#http -F $M "https://gyro-405519.uc.r.appspot.com/internal/$1" Authorization:'demo-lindauer-ai' ${@:2}
http -F $M "https://api.lindauerai.com/internal/$1" Authorization:'demo-lindauer-ai' ${@:2}
