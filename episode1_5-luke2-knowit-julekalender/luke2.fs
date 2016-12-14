let fibSeq = Seq.unfold (fun (a,b) -> Some( a+b, (b, a+b) ) ) (0m,1m)

fibSeq
  |> Seq.filter (fun x -> x % 2m = 0m)
  |> Seq.takeWhile (fun x -> x < 4000000000m)
  |> Seq.sum
