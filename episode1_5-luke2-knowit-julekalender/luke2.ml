(*
  Fibonaccirekken er en tallrekke som genereres ved at man
  adderer de to foregående tallene i rekken. f.eks. om man starter
  med 1 og 2 blir de første 10 termene 1, 2, 3, 5, 8, 13, 21, 34, 55 og 89.
  Finn summen av alle partall i denne rekken som er mindre enn 4.000.000.000
*)
type 'int stream = Cons of int * (unit -> 'int stream)
let fib : int stream =
  let rec next a b: int stream =
    Cons(a, fun () -> next b (a + b))
  in next 1 1;;

let rec sumStream ( s : int stream ) : int =
  match s with
  | Cons (h, _) when h >= 4000000000 -> 0
  | Cons (h, t) when h mod 2 <> 0 -> t () |> sumStream
  | Cons (h, t) -> h + sumStream (t ());;

sumStream fib |> print_int;;
