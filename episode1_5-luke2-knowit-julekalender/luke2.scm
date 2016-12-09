(define (solve a b)
  (cond
    ((>= a 4000000000) 0)
    ((even? a) (+ a (solve b (+ a b))))
    (else (solve b (+ a b)))))
(solve 0 1)
