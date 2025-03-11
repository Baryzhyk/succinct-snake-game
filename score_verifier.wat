(module
  (func $verify_score (param $score i32) (result i32)
    (if (i32.gt_s (local.get $score) (i32.const 0))
      (then (return (i32.const 1)))
      (else (return (i32.const 0)))
    )
  )
  (export "verify_score" (func $verify_score))
)
