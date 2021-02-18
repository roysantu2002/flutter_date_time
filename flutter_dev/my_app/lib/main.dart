import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue, brightness: Brightness.dark),
      home: DatePickerDemo(),
    );
  }
}

class DatePickerDemo extends StatefulWidget {
  @override
  _DatePickerDemoState createState() => _DatePickerDemoState();
}

class _DatePickerDemoState extends State<DatePickerDemo> {
  /// Which holds the selected date
  /// Defaults to today's date.
  static DateTime selectedDate = DateTime.now();
  static DateFormat dateFormat = new DateFormat("yyyy-MM-dd");
  String formattedDate = dateFormat.format(selectedDate);
  // static DateFormat dateFormat = new DateFormat("yyyy-MM-dd");
// String formattedDate = dateFormat.format(selectedDate);
  var unavailableDates = ["2021-02-19", "2021-02-22", "2021-02-20"];
  List<DateTime> availbleDates = [];

  List<DateTime> getDaysInBeteween(DateTime startDate, DateTime endDate) {
    List<DateTime> days = [];
    for (int i = 0; i <= endDate.difference(startDate).inDays; i++) {
      String partialDate = "" +
          startDate.year.toString() +
          "-" +
          startDate.month.toString() +
          "-" +
          startDate.day.toString();

      if (!unavailableDates.contains(partialDate)) {
        days.add(DateTime(
            startDate.year,
            startDate.month,
            // In Dart you can set more than. 30 days, DateTime will do the trick
            startDate.day + i));
      }
    }
    return days;
  }

//   _selectedDate(){
//    for (var i = 0; i < unavailableDates.length; i++) {
//   print(DateFormat.yMMMd().format(int.parse(unavailableDates[i])));
// }

  bool _decideWhichDayToEnable(DateTime val) {
    print(getDaysInBeteween(
        new DateTime.now(), new DateTime.now().add(new Duration(days: 3))));

    String _dates = dateFormat.format(val); //formatting passed in value
    //print((_dates));
    if (!unavailableDates.contains(_dates)) {
      // selectedDate = val;
      if (!availbleDates.contains(val)) {
        //print(val);
        availbleDates.add(val);
      }
      return true;
    } else {
      return false;
    }
    // return !unavailableDates.contains(_dates);
  }

  // _nearestDate() {
  //   // availbleDates.sort((a, b) => a.length.compareTo(b.length));
  //   return availbleDates[0];
  // }

  //   final DateFormat formatter = DateFormat(dateTime);
  // final String formatted = formatter.format(now);
  //   if (dateTime.day == 10 || dateTime.day == 20 || dateTime.day == 30) {
  //     //This means that No. 10, No. 20, No. 30 are not optional.
  //     return false;
  //   }
  //   return true;
  // }

  _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: selectedDate,
      fieldLabelText: 'Booking date',
      fieldHintText: 'Month/Date/Year',
      helpText: 'Select Booking Date',
      cancelText: 'Not Now',
      confirmText: 'Book',
      lastDate: new DateTime.now().add(new Duration(days: 30)),
      selectableDayPredicate: _decideWhichDayToEnable,
    );
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text(
              "${selectedDate.toLocal()}".split(' ')[0],
              style: TextStyle(fontSize: 55, fontWeight: FontWeight.bold),
            ),
            SizedBox(
              height: 20.0,
            ),
            RaisedButton(
              onPressed: () => _selectDate(context),
              child: Text(
                'Select date',
                style:
                    TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
              ),
              color: Colors.greenAccent,
            ),
          ],
        ),
      ),
    );
  }
}
